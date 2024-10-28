export default class AuthAPI {
    static async login(email: string, password: string): Promise<{ token: string }> {
        if (email === 'user@example.com' && password === 'password') {
            return { token: 'fake-jwt-token' };
        }
        throw new Error('Invalid credentials');
    }
}