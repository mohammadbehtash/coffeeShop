
import { Creator } from "./creator.model"

export interface Article {
    body: string
    categoryID: string
    cover: string
    createdAt: string
    creator: Creator
    description: string
    href: string
    publish: number
    title: string
    updatedAt: string
    __v: number
    _id: string
}
export interface Category{
    title: string
    _id: string
}