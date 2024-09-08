import { Product } from "./product.model"

export interface Creator {
    cart?: Cart
    createdAt: string
    email: string
    isVerified: boolean
    name: string
    phone: string
    refreshToken?: string
    role: string
    updatedAt: string
    username: string
    __v: number
    _id: string
}

export interface Cart {
    items: Items[]
}
export interface Items {
    productId: Product
    quantity: number
    _id: string
}