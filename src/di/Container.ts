import {Config} from "../config";
import StatsMapper from "../data/datasources/stats/remote/StatsMapper";
import StatsAPIDataSourceImpl from "../data/datasources/stats/remote/StatsAPIDataSource";
import StatsRepositoryImpl from "../data/repositories/StatsRepositoryImpl";
import GetStatsUseCase from "../domain/usecases/stats/GetStatsUseCase";
import {StatsRepository} from "../domain/repositories/StatsRepository";

class DIContainer {
    private statsRepository: StatsRepository;
    getStatsUseCase: GetStatsUseCase;

    constructor() {
        const moshimoshi = Config.getInstance().moshimoshi;
        const mapper = new StatsMapper();
        const statsDataSource = new StatsAPIDataSourceImpl(moshimoshi, mapper);

        this.statsRepository = new StatsRepositoryImpl(statsDataSource);
        this.getStatsUseCase = new GetStatsUseCase(this.statsRepository);
    }
}

const diContainer = new DIContainer();
export default diContainer;
