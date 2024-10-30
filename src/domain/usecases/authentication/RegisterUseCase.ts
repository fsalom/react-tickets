import {AuthRepository} from "../../repositories/AuthRepository";

export default class RegisterUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    execute(email: string, password: string, name: string): Promise<any> {
        return this.authRepository.login(email, password);
    }
}