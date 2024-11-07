import { AuthRepository } from '../../domain/repositories/AuthRepository';
import User from "../../domain/entities/User";
import {AuthDataSource} from "../datasources/authentication/AuthDataSource";

export default class AuthRepositoryImpl implements AuthRepository {
    private datasource: AuthDataSource;

    constructor(datasource: AuthDataSource) {
        this.datasource = datasource;
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const response = await this.datasource.login(email, password);
            const user = new User(email, "");
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    async register(email: string, password: string, name: string): Promise<void> {
        try {
            const response = await this.datasource.register(email, password, name);
            const user = new User(email, "");
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    isAuthenticated(): boolean {
        const user = localStorage.getItem('user');
        return user !== null && JSON.parse(user) !== null;
    }

    logout(): void {
        localStorage.removeItem('user');
    }
}