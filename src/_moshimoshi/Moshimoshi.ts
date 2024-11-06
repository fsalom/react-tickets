import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ContentType} from './entity/Types';
import {Endpoint} from './entity/Endpoint';
import {Storage} from './storage/Storage'
import {TokenType} from "./storage/TokenType";
import {Token} from "./entity/Token";

export class Moshimoshi {
    baseURL: string;
    instance: AxiosInstance;
    storage: Storage;
    loginEndpoint: Endpoint;
    refreshEndpoint: Endpoint;

    private static instance: Moshimoshi;

    private constructor(baseURL: string,
                        storage: Storage,
                        loginEndpoint: Endpoint,
                        refreshEndpoint: Endpoint) {
        this.baseURL = baseURL;
        this.instance = axios.create({ baseURL: this.baseURL });
        this.storage = storage;
        this.loginEndpoint = loginEndpoint
        this.refreshEndpoint = refreshEndpoint

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => this.handleResponseError(error)
        );
    }

    public static getInstance(baseURL: string,
                              storage: Storage,
                              loginEndpoint: Endpoint,
                              refreshEndpoint: Endpoint): Moshimoshi {
        if (!Moshimoshi.instance) {
            Moshimoshi.instance = new Moshimoshi(
                baseURL,
                storage,
                loginEndpoint,
                refreshEndpoint);
        }
        return Moshimoshi.instance;
    }

    private async handleResponseError(error: any) {
        if (error.response && error.response.status === 401) {
            console.warn('Token expirado: Intentando renovar el token');
            const newToken = await this.refreshToken();

            if (newToken) {
                error.config.headers['Authorization'] = `Bearer ${newToken}`;
                return this.instance.request(error.config);
            } else {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }

    private async refreshToken() {
        try {
            const response = await axios.post(`${this.baseURL}/auth/refresh`, {
                refreshToken: this.storage.retrieve(TokenType.REFRESH),
            });
            const newToken = response.data.accessToken;
            this.storage.save(newToken, TokenType.ACCESS)
            return newToken;
        } catch (error) {
            console.error('Error renovando token:', error);
            return null;
        }
    }

    async loadAuthorized(endpoint: Endpoint) {
        let config = this.buildRequest(endpoint);
        config = this.authenticate(config);
        try {
            const response = await this.instance(config);
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
            return response.data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    async login(data: any) {
        let config = this.buildRequest(this.loginEndpoint);
        config.data = data
        try {
            const response = await this.instance(config);
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

    private authenticate(config: AxiosRequestConfig): AxiosRequestConfig {
        const token = this.storage.retrieve(TokenType.ACCESS);
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
            return config;
        } else {
            throw new Error('Access token not found');
            window.location.href = '/login';
        }
    }

    private buildURL(endpoint: Endpoint): string {
        let path = endpoint.path;
        for (const [key, value] of Object.entries(endpoint.parameters)) {
            path = path.replace(`:${key}`, encodeURIComponent(value));
        }
        return `${this.baseURL}${path}`;
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
}
