export type Game = {
  id: number
  Nome: string
  Descricao: string
  Desenvolvedora: string
  Preco: number
  Capa: Cover
}

type Cover = {
  id: number
  url: string
}

export type User = {
  id: number
  username: string
  email: string
  role: Role
  carrinho: Carrinho
}

type Carrinho = {
  id: number
  jogos : Game[]
}

type Role = {
  name: string
}

export type Avaliacao = {
  id: number
  Corpo: string
  Feedback: boolean
}

export interface ApplicationError {
  error: {
    name: string
    message: string
  }
}
