<template>
  <div class="border-bottom fill"></div>

  <div class="caixa-login">
    <div class="container col col-md-6 col-xl-3">
      <h1 class="mb-4">GameNest</h1>
      <form class="border p-3 rounded my-3">
        <h4>Entrar</h4>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="exemplo@mail.com"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Senha</label>
          <input type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
      <p class="mt-5 mb-3 text-body-secondary">© 2024-2024</p>
    </div>
  </div>
</template>

<style scoped>
.fill {
  height: 71px;
}

.caixa-login {
  height: 70vh;
  display: flex;
  align-items: center;
}

h1 {
  font-family: 'Tiny5';
  text-align: center;
  font-size: xxx-large;
}
</style>
