export default class Product {
    name: string;
    quantity: number;
    pricePerUnit: number;
    price: number;
    weight: number | null;

    constructor({ name, quantity, price_per_unit, price, weight }:
                    { name: string; quantity: number; price_per_unit: number; price: number; weight: number | null }) {
        this.name = name;
        this.quantity = quantity;
        this.pricePerUnit = price_per_unit;
        this.price = price;
        this.weight = weight;
    }
}