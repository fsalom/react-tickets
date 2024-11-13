import User from "../entities/User";

export interface UserRepository {
    getUser(): Promise<User>;
}