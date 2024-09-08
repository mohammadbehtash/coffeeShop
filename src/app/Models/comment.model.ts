import { AnswerComment } from "./answerComment.model"
import { Creator } from "./creator.model"
import { Product } from "./product.model"
export interface Comment {
    answerComment: AnswerComment
    body: string
    create: Creator
    createdAt: string
    iaAccept: number
    isAnswer: number
    product: Product
    score: number
    updatedAt: string
    __v: number
    _id: string
}
