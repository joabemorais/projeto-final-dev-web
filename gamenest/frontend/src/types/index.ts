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
}

type Role = {
  name: string
}

export interface ApplicationError {
  error: {
    name: string
    message: string
  }
}