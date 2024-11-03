import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ContentType} from './entity/Types';
import {Endpoint} from './entity/Endpoint';
import {Storage} from './storage/Storage'
import {TokenType} from "./storage/TokenType";

export class Moshimoshi {
    baseURL: string;
    instance: AxiosInstance;
    storage: Storage;

    constructor(baseURL: string, storage: Storage) {
        this.baseURL = baseURL;
        this.instance = axios.create({ baseURL: this.baseURL });
        this.storage = storage;

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => this.handleResponseError(error)
        );
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

    async request(endpoint: Endpoint) {
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

        try {
            const response = await this.instance(config);
            return response.data;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    }

    private buildURL(endpoint: Endpoint): string {
        let path = endpoint.path;
        for (const [key, value] of Object.entries(endpoint.parameters)) {
            path = path.replace(`:${key}`, encodeURIComponent(value));
        }
        return `${this.baseURL}${path}`;
    }
}
