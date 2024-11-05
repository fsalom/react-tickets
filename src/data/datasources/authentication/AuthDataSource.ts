import User from "../../../domain/entities/User";

export interface AuthDataSource {
    login(email: string, password: string): Promise<User>;
    register(email: string, password: string, name: string): Promise<void>;
    isAuthenticated(): boolean;
    logout(): void;
}