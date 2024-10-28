export default class ValidatePasswordUseCase {
    execute(password: string): boolean {
        return !(!password || password.length < 6)
    }
}