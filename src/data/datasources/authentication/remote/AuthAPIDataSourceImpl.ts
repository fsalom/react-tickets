import {AuthDataSource} from "../AuthDataSource";
import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";

export default class AuthAPIDataSourceImpl implements AuthDataSource {
    private client: Moshimoshi;

    constructor(client: Moshimoshi) {
        this.client = client;
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const data = {
                username: email,
                password: password,
                client_id: "J7DB96nvUAiRCsllouT1zu8inOUsnjObqS1t7TGs"
            }
            await this.client.login(data)
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