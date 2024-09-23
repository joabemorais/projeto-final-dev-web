# :checkered_flag: GameNest :video_game:

A aplicação consiste em uma loja virtual de jogos eletrônicos em mídia digital. 

## :technologist: Membros da equipe

- 539029 - Antônio Joabe Alves Morais - CC
- 535779 - Iarley Natã Lopes Souza - CC

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Visitante (Usuário não registrado)
- Cliente
- Administrador

## :spiral_calendar: Entidades ou tabelas do sistema

- Usuário
- Jogo
- Avaliação
- Carrinho

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

- O Visitante poderá visualizar jogos e adicioná-los ao carrinho. Porém, para finalizar a compra e fazer avaliações, é necessário realizar o login/cadastro.

- O Cliente poderá visualizar jogos, adicionar ao carrinho, finalizar a compra, avaliar jogos e manter seus jogos adquiridos.

- O Administrador poderá visualizar, adicionar, remover e editar jogos. Além disso, também contará com as mesmas funcionalidades de um usuário autenticado padrão.

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

- Vue.js
- Bootstrap
- HTML
- Pinia
- Axios

**Backend:**

- Strapi

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário | X | X | X | X |
| Jogo | X | X | X | X |
| Avaliação | X | X | X | X |
| Carrinho | X | X | X | X |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/ |
| POST | api/ |
| PUT |  api/ |
| DELETE | api/ |
| GET | api/ |
| POST | api/auth/local/register |
| PUT |  api/users/id |
| DELETE| api/ |
| GET | api/ |
| POST | api/ |
| PUT | api/ |
| DELETE | api/ |
