export interface AuthDataSource {
    login(email: string, password: string): Promise<void>;
    register(email: string, password: string, name: string): Promise<void>;
    isAuthenticated(): boolean;
    logout(): void;
}