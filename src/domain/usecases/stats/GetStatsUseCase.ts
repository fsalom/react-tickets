import {StatsRepository} from "../../repositories/StatsRepository";
import Stats from "../../entities/Stats";

export default class GetStatsUseCase {
    private repository: StatsRepository;

    constructor(repository: StatsRepository) {
        this.repository = repository;
    }

    execute(): Promise<Stats> {
        return this.repository.getStats();
    }
}