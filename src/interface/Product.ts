export interface Product {
    id?: number;
    name: string,
    brand: string,
    description: string;
    price: number;
    size: string,
    color: string,
    quantity: number;
    status: string;
    item_id: number;
    created_at: Date;
}