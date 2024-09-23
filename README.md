# :checkered_flag: GameNest :video_game:

A aplicação consiste em uma loja virtual de jogos eletrônicos em mídia digital. 

## :technologist: Membros da equipe

- 539029 - Antônio Joabe Alves Morais - CC
- 535779 - Iarley Natã Lopes Souza - CC

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Visitante (Usuário não registrado)
- Cliente (Authenticated)
- Administrador (Admin)

## :spiral_calendar: Entidades ou tabelas do sistema

- Usuário
- Jogo
- Avaliação
- Carrinho

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

- O Visitante poderá apenas visualizar jogos e suas avaliações.

- O Cliente poderá visualizar jogos, avaliações, adicionar ao carrinho, finalizar a compra, avaliar jogos e manter seus jogos adquiridos. Este também poderá atualizar ou deletar seu perfil.

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
| GET | api/users-permissions/roles |
| GET | api/users |
| GET | api/users/id |
| GET | api/users/me |
| DELETE | api//users/id |
| PUT |  api/users/id |
| GET | api/jogos |
| GET | api/jogos/id |
| POST | api/jogos |
| DELETE | api/jogos/id |
| PUT | api/jogos/id |
| GET | api/carrinhos |
| GET | api/carrinhos/id |
| DELETE | api/carrinhos/id |
| PUT | api/carrinhos/id |
| GET | api/avaliacaos |
| GET | api/avaliacaos/id |
| POST | api/avaliacaos |
| DELETE | api/avaliacaos/id |
| PUT | api/avaliacaos/id |

## Contas para acessar o sistema

### Admin

- Email: admin@mail.com
- Senha: admin123456

### Usuários Cliente

#### Iarley

- Email: iarley@mail.com
- Senha: 123456

#### Joabe

- Email: joabe@mail.com
- Senha: 123456

***Se desejar, pode registrar sua própria conta***

## Login Strapi

Email e senha para logar no strapi (se necessário):

- Email: souzaiarley20@gmail.com
- Senha: Iarley080104
