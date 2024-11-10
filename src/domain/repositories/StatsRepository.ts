import Stats from "../entities/Stats";

export interface StatsRepository {
    getStats(): Promise<Stats>
}