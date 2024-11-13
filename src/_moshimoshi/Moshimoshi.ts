import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {ContentType} from './entity/Types';
import {Endpoint} from './entity/Endpoint';
import {Storage} from './storage/Storage'
import {TokenType} from "./storage/TokenType";
import {Token} from "./entity/Token";

export class Moshimoshi {
    instance: AxiosInstance;
    private storage: Storage;
    private loginEndpoint: Endpoint;
    private refreshEndpoint: Endpoint;
    private logoutEndpoint?: Endpoint;
    num = 0

    private static instance: Moshimoshi;

    private constructor(storage: Storage,
                        loginEndpoint: Endpoint,
                        refreshEndpoint: Endpoint,
                        logoutEndpoint?: Endpoint) {
        this.instance = axios.create();
        this.storage = storage;
        this.loginEndpoint = loginEndpoint;
        this.refreshEndpoint = refreshEndpoint;
        this.logoutEndpoint = logoutEndpoint;

        this.instance.interceptors.request.use(
            (value: InternalAxiosRequestConfig<any>) => {
            console.log(`${value.method} ${value.url}`);
            console.log('Headers:', value.headers);
            console.log('Cuerpo:', value.data);
            return value;
        });

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => this.handleResponseError(error)
        );
    }

    public static getInstance(storage: Storage,
                              loginEndpoint: Endpoint,
                              refreshEndpoint: Endpoint): Moshimoshi {
        if (!Moshimoshi.instance) {
            Moshimoshi.instance = new Moshimoshi(
                storage,
                loginEndpoint,
                refreshEndpoint);
        }
        return Moshimoshi.instance;
    }

    private async handleResponseError(error: any) {
        if (error.response && error.response.status === 401) {
            console.warn('Token expirado: Intentando renovar el token');
            await this.refreshToken();
            const accessToken = this.storage.retrieve(TokenType.ACCESS)?.value;
            if (accessToken) {
                error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                return this.instance.request(error.config);
            } else {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }

    async loadAuthorized(endpoint: Endpoint) {
        console.log("Llamada ejecutada")
        this.num = this.num + 1
        console.log(this.num)
        let config = this.buildRequest(endpoint);
        config = await this.authenticate(config);
        console.log("Autenticado")
        try {
            const response = await this.instance(config);
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    async load(endpoint: Endpoint) {
        const config = this.buildRequest(endpoint);
        try {
            const response = await this.instance(config);
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    async login(data: any): Promise<void> {
        this.loginEndpoint.body = {
            ...this.loginEndpoint.body,
            ...data
        };
        try {
            const response = await this.load(this.loginEndpoint);
            const { access_token, refresh_token, expires_in } = response;
            const accessToken = new Token(access_token, expires_in);
            const refreshToken = new Token(refresh_token, null);
            this.storage.save(accessToken, TokenType.ACCESS)
            this.storage.save(refreshToken, TokenType.REFRESH)
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    private async authenticate(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        const token = await this.getAccessToken()
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
        return config;
    }

    private buildURL(endpoint: Endpoint): string {
        let path = endpoint.path;
        for (const [key, value] of Object.entries(endpoint.parameters)) {
            path = path.replace(`:${key}`, encodeURIComponent(value));
        }
        return `${path}`;
    }

    private buildRequest(endpoint: Endpoint): AxiosRequestConfig {
        const url = this.buildURL(endpoint);
        const config: AxiosRequestConfig = {
            method: endpoint.httpMethod,
            url,
            headers: {
                'Content-Type': endpoint.contentType || ContentType.JSON,
                ...endpoint.headers,
            },
            params: endpoint.query,
        };
        if (endpoint.body) {
            config.data = endpoint.body;
        }
        return config;
    }

    async getAccessToken(): Promise<string | undefined> {
        try {
            const accessToken = this.storage.retrieve(TokenType.ACCESS);
            if (accessToken) {
                if (accessToken.isValid) {
                    return accessToken.value
                } else {
                    const refreshToken = this.storage.retrieve(TokenType.REFRESH);
                    if (refreshToken) {
                        await this.refreshToken();
                        return await this.getAccessToken()
                    } else {
                        this.logout()
                    }
                }
            }
            return accessToken?.value;
        } catch (error) {
            return undefined;
        }
    }

    private async refreshToken() {
        this.refreshEndpoint.body = {
            ...this.refreshEndpoint.body,
            refreshToken: this.storage.retrieve(TokenType.REFRESH)?.value,
        };
        try {
            const response = await this.load(this.refreshEndpoint);
            const { access_token, refresh_token, expires_in } = response.data;
            const accessToken = new Token(access_token, expires_in);
            const refreshToken = new Token(refresh_token, null);
            this.storage.save(accessToken, TokenType.ACCESS)
            this.storage.save(refreshToken, TokenType.REFRESH)
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        if (this.logoutEndpoint) {
            await this.load(this.logoutEndpoint);
        }
        this.storage.deleteAll()
        window.location.href = '/login';
    }
}
