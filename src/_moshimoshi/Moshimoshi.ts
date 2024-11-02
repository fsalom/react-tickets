import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ContentType, HTTPMethod } from './entity/Types';
import { Endpoint } from './entity/Endpoint';

export class Moshimoshi {
    baseURL: string;
    instance: AxiosInstance;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.instance = axios.create({ baseURL: this.baseURL });

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => this.handleResponseError(error)
        );
    }

    private async handleResponseError(error: any) {
        if (error.response && error.response.status === 401) {
            console.warn('No autorizado: Redirigiendo al inicio de sesión');
            // Aquí puedes redirigir al usuario o intentar renovar el token
            // Por ejemplo: window.location.href = '/login';
        }
        return Promise.reject(error);
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
