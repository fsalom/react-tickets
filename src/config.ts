import {Moshimoshi} from "./_moshimoshi/Moshimoshi";
import {Storage} from "./_moshimoshi/storage/Storage";
import LocalStorageImpl from "./_moshimoshi/storage/local/LocalStorageImpl";
import {Endpoint} from "./_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "./_moshimoshi/entity/Types";

export class Config {
    private static instance: Config;
    public readonly storage: Storage;
    public readonly moshimoshi: Moshimoshi;
    public readonly loginEndpoint: Endpoint;
    public readonly refreshEndpoint: Endpoint;

    private constructor() {
        this.storage = new LocalStorageImpl()
        this.loginEndpoint = new Endpoint({
            path: '/api/v1/auth/login/',
            httpMethod: HTTPMethod.POST,
            body: {
                client_id: "zj4PJ8xg6ZCeonLAKyzBmrZHj7s3KY9tZRP0RSxe"
            }
        });
        this.refreshEndpoint = new Endpoint({
            path: '/api/v1/auth/refresh/',
            httpMethod: HTTPMethod.POST,
            body: {
                client_id: "zj4PJ8xg6ZCeonLAKyzBmrZHj7s3KY9tZRP0RSxe"
            }
        });
        this.moshimoshi = Moshimoshi.getInstance(
            this.storage,
            this.loginEndpoint,
            this.refreshEndpoint);
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }
}