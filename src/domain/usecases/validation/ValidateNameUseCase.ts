export default class ValidateNameUseCase {
    execute(name: string): boolean {
        return !(!name || name.length < 1)
    }
}