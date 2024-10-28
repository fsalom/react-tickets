export default class ValidateEmailUseCase {
    execute(email: string): boolean {
        return !(!email || !/\S+@\S+\.\S+/.test(email))
    }
}