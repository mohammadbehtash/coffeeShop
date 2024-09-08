import { Creator } from "./creator.model"

export interface AnswerComment {
    body: string
    create: Creator
    createdAt: string
    iaAccept: number
    isAnswer: number
    mainCommendID: string
    product: string
    updatedAt: string
    __v: number
    _id: string
}