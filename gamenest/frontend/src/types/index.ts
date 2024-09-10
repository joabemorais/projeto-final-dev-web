export type Game = {
    id: number,
    title: string,
    price: number,
    cover: Cover,
    description: string
}

type Cover = {
    id: number,
    url: string
}