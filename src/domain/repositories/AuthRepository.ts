import User from "../entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<User>;
    register(email: string, password: string, name: string): Promise<void>;

    isAuthenticated(): boolean;

    logout(): void;
}