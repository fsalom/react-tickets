import {AuthDataSource} from "../AuthDataSource";
import {Error} from "@mui/icons-material";
import User from "../../../../domain/entities/User";
import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";
import {Endpoint} from "../../../../_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "../../../../_moshimoshi/entity/Types";

export default class AuthAPIDataSourceImpl implements AuthDataSource {
    private client: Moshimoshi;

    constructor(client: Moshimoshi) {
        this.client = client;
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const getUserEndpoint = new Endpoint({
                path: '/users/:id',
                httpMethod: HTTPMethod.GET,
                parameters: {id: 1},
                query: {includePosts: true},
            });
            const response = await this.client.request(getUserEndpoint)
            const user = new User(email, "");
            return user;
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    }

    async register(email: string, password: string, name: string): Promise<void> {
        if (email === 'user@example.com' && password === 'password') {
            const tokenData = {
                value: 'fake-jwt-token',
                expireDate: Date.now(),
                expireInt: 3600,
            };
            localStorage.setItem('accessToken', JSON.stringify(tokenData));
            localStorage.setItem('refreshToken', JSON.stringify(tokenData));
        }
        throw new Error('Invalid credentials');
    }

    logout(): void {
    }

    isAuthenticated(): boolean {
        return false;
    }
}