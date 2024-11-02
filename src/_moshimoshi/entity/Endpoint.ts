import {ContentType, HTTPMethod} from "./Types";


interface EndpointConfig {
    path: string;
    httpMethod: HTTPMethod;
    contentType?: ContentType;
    body?: any;
    parameters?: Record<string, any>;
    headers?: Record<string, string>;
    query?: Record<string, any>;
}

export class Endpoint {
    baseURL: string = '';
    path: string;
    httpMethod: HTTPMethod;
    contentType?: ContentType;
    body?: any;
    parameters: Record<string, any> = {};
    query: Record<string, any> = {};
    headers: Record<string, string>;

    constructor(config: EndpointConfig) {
        this.path = config.path;
        this.httpMethod = config.httpMethod;
        this.contentType = config.contentType || ContentType.JSON;
        this.parameters = config.parameters || {};
        this.headers = config.headers || {};
        this.body = config.body;
        this.query = config.query || {};
    }
}
