import User from "../../../../domain/entities/User";
import {UserDataSource} from "../UserDataSource";
import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";
import {Endpoint} from "../../../../_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "../../../../_moshimoshi/entity/Types";

export default class UserAPIDataSourceImpl implements UserDataSource {
    private client: Moshimoshi;

    constructor(client: Moshimoshi) {
        this.client = client;
    }

    async getUser(): Promise<User> {
        const endpoint = new Endpoint({
            path: '/api/v1/auth/register/',
            httpMethod: HTTPMethod.POST
        });
        const data = await this.client.load(endpoint);
        const { email, name } = data;
        return new User(email, name);
    }
}