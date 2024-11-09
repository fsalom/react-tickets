import {AuthDataSource} from "../AuthDataSource";
import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";
import {Endpoint} from "../../../../_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "../../../../_moshimoshi/entity/Types";

export default class AuthAPIDataSourceImpl implements AuthDataSource {
    private client: Moshimoshi;

    constructor(client: Moshimoshi) {
        this.client = client;
    }

    async login(email: string, password: string): Promise<void> {
        const data = {
            username: email,
            password: password,
        }
        await this.client.login(data)
    }

    async register(email: string, password: string, name: string): Promise<void> {
        const endpoint = new Endpoint({
            path: '/api/v1/auth/register/',
            httpMethod: HTTPMethod.POST,
            body: {
                email: email,
                password: password,
                name: name
            }
        });
        await this.client.load(endpoint)
    }

    async logout(): Promise<void> {
        await this.client.logout()
    }

    isAuthenticated(): boolean {
        return false;
    }
}