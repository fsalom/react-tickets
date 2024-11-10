import Stats from "../../../domain/entities/Stats";

export interface StatsDataSource {
    getStats(): Promise<Stats>;
}