import Stats from "../../../../domain/entities/Stats";
import Product from "../../../../domain/entities/Product";

export default class StatsMapper {
    toDomain(data: any): Stats {
        const { num_tickets, num_products, total, top_products } = data;

        const mappedTopProducts = top_products.map((product: any) => new Product({
            name: product.name,
            quantity: product.quantity,
            price_per_unit: product.price_per_unit,
            price: product.price,
            weight: product.weight,
        }));

        return new Stats(BigInt(num_tickets), BigInt(num_products), total, mappedTopProducts);
    }
}
