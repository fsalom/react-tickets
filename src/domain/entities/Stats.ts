import Product from "./Product";

export default class Stats {
    numTickets: bigint;
    numProducts: bigint;
    total: number;
    topProducts: Product[];

    constructor(numTickets: bigint, numProducts: bigint, total: number, topProducts: Product[]) {
        this.numTickets = numTickets;
        this.numProducts = numProducts;
        this.total = total;
        this.topProducts = topProducts;
    }
}
