import User from "../../../../domain/entities/User";
import {UserDataSource} from "../UserDataSource";

export default class UserMemoryDataSourceImpl implements UserDataSource {
    private static user: User

    async getUser(): Promise<User> {
        return UserMemoryDataSourceImpl.user
    }
}