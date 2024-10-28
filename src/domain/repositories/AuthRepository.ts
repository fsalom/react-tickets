import User from "../entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<User>;

    isAuthenticated(): boolean;

    logout(): void;
}