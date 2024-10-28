import { AuthRepository } from '../../domain/repositories/AuthRepository';
import User from "../../domain/entities/User";
import AuthAPI from "../datasources/AuthAPI";

export default class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<User> {
        try {
            const response = await AuthAPI.login(email, password);
            const user = new User(email, response.token);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
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