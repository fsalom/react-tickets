import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";
import {Endpoint} from "../../../../_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "../../../../_moshimoshi/entity/Types";
import Stats from "../../../../domain/entities/Stats";
import {StatsDataSource} from "../StatsDataSource";
import StatsMapper from "./StatsMapper"

export default class StatsAPIDataSourceImpl implements StatsDataSource {
    private client: Moshimoshi;
    private mapper: StatsMapper;

    constructor(client: Moshimoshi, mapper: StatsMapper) {
        this.client = client;
        this.mapper = mapper;
    }

    async getStats(): Promise<Stats> {
        const endpoint = new Endpoint({
            path: '/api/v1/tickets/stats/all',
            httpMethod: HTTPMethod.GET
        });
        const data = await this.client.loadAuthorized(endpoint);
        return this.mapper.toDomain(data);
    }
}