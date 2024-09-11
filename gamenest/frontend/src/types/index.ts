export type Game = {
    id: number,
    Nome: string,
    Descricao: string,
    Desenvolvedora: string,
    Preco: number,
    Capa: Cover
}

type Cover = {
    id: number,
    url: string
}