import User from "../../domain/entities/User";
import {StatsRepository} from "../../domain/repositories/StatsRepository";
import Stats from "../../domain/entities/Stats";
import {StatsDataSource} from "../datasources/stats/StatsDataSource";

export default class StatsRepositoryImpl implements StatsRepository {
    private remote: StatsDataSource;

    constructor(remote: StatsDataSource) {
        this.remote = remote;
    }

    async getStats(): Promise<Stats> {
        return this.remote.getStats();
    }
}