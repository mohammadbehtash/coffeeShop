export interface Menu {
    createdAt?: string
    href: string
    title: string
    parent?: Menu
    updatedAt?: string
    __v?: number
    _id?: string
}
export interface MenuParent {
    createdAt: string
    href: string
    submenu:Menu[]
    title: string
    updatedAt: string
    __v:number
    _id: string
}
