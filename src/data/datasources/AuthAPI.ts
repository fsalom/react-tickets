export default class AuthAPI {
    static async login(email: string, password: string): Promise<{ token: string }> {
        if (email === 'user@example.com' && password === 'password') {
            const tokenData = {
                value: 'fake-jwt-token',
                expireDate: Date.now(),
                expireInt: 3600,
            };
            localStorage.setItem('accessToken', JSON.stringify(tokenData));
            localStorage.setItem('refreshToken', JSON.stringify(tokenData));
            return { token: 'fake-jwt-token' };
        }
        throw new Error('Invalid credentials');
    }
}