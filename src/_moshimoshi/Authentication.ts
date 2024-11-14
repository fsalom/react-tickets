export interface Authentication {
    login(data: any): Promise<void>;
    getCurrentToken(): Promise<string | undefined>
    isLoggedIn(): Promise<boolean>
    logout(): Promise<void>
}