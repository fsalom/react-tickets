import {Moshimoshi} from "../../../../_moshimoshi/Moshimoshi";
import {Endpoint} from "../../../../_moshimoshi/entity/Endpoint";
import {HTTPMethod} from "../../../../_moshimoshi/entity/Types";
import Stats from "../../../../domain/entities/Stats";
import {StatsDataSource} from "../StatsDataSource";

export default class StatsAPIDataSourceImpl implements StatsDataSource {
    private client: Moshimoshi;

    constructor(client: Moshimoshi) {
        this.client = client;
    }

    async getStats(): Promise<Stats> {
        const endpoint = new Endpoint({
            path: '/api/v1/auth/register/',
            httpMethod: HTTPMethod.POST
        });
        const data = await this.client.load(endpoint);
        const { number } = data;
        return new Stats(number);
    }
}