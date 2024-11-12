import User from "../../../domain/entities/User";

export interface UserDataSource {
    getUser(): Promise<User>;
}