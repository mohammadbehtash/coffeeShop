import { Creator } from "./creator.model"
import { Product } from "./product.model"

export interface Order {
    products: OrderProduct[]
    totalAmount: number
    // createdAt:string
}

export interface OrderProduct {
    date: string
    price: number
    productCover: string
    productHref: string
    productId: string
    productName: string
    quantity: number
}

export interface OrderAdmin{
    createdAt: string
isSend: number
items: itemOrder[]
status: string
totalAmount: number
updatedAt: string
userId: Creator
__v: number
_id: string
}

export interface itemOrder{
    price: number
productId:Product 
quantity: number
}