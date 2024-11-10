import {UserRepository} from "../../repositories/UserRepository";
import User from "../../entities/User";

export default class GetUserUseCase {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    execute(): Promise<User> {
        return this.repository.getUser();
    }
}