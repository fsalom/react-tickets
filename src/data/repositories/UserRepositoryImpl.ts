import User from "../../domain/entities/User";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {UserDataSource} from "../datasources/user/UserDataSource";

export default class UserRepositoryImpl implements UserRepository {
    private remote: UserDataSource;
    private memory: UserDataSource;

    constructor(remote: UserDataSource, memory: UserDataSource) {
        this.remote = remote;
        this.memory = memory;
    }

    async getUser(): Promise<User> {
        return this.remote.getUser();
    }
}