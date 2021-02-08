<template>
  <div class="containerHeaderBotons">
    <div class="hero">
      <div class="containerLogoBotons">
        <div class="containerLogo" @click="$router.push({ name: 'MainBooks' })">
          <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret id="menuMovil">
            <template #button-content>
              <span style="color:#d82a4e;font-weight:bold;font-size:30px" >&#x2630;</span><span class="sr-only" >Menu</span>
            </template>
            <b-dropdown-item href="#">Inicio</b-dropdown-item>
            <b-dropdown-item href="#">Quienes Somos</b-dropdown-item>
            <b-dropdown-item href="#">Libros</b-dropdown-item>
            <b-dropdown-item href="#/create-book" v-if="getAccessToken">Recomienda un libro</b-dropdown-item>
            <b-dropdown-item href="#/admin-category" v-if="getAccessToken && getDataUser.role == 'ADMIN'">Admin Categorías</b-dropdown-item>
          </b-dropdown>
          <img src="../assets/img/logo.png" alt="logo pink book" class="logo" />
        </div>
        <div class="containerBotons">
          <ul>
            <li>
              Inicio
            </li>
            <li>
              Quienes somos
            </li>
            <li>
              Libros
            </li>
            <li>
              Noticias
            </li>
            <li>
              Contactanos
            </li>
          </ul>
        </div>
        <div class="containerLogin"></div>
      </div>
      <div class="headerTitulo">
        Login
      </div>
      <div class="headerSubTitulo">
        Accede a mas beneficios
      </div>
      <div class="hero-section set-bg" data-setbg="/img/bg.jpg">
        <div class="container">
          <form class="intro-newslatter text-center">
            <div class="row justify-content-center">
              <div class="col-12 col-md-6 mb-3">
                <input
                  type="email"
                  placeholder=""
                  class="inputCabecera"
                  v-model.trim="email"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <input
                  type="password"
                  placeholder=""
                  class="inputCabecera"
                  v-model.trim="password"
                />
              </div>
              <div class="col-lg-12 mt-3">
                <button class="site-btn btn-block boton" @click="login">
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../service/auth.service";
import UsersService from "../service/users.service";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      authService: null,
      usersService: null,
      email: null,
      password: null,
    };
  },
  created() {
    this.authService = new AuthService();
    this.usersService = new UsersService();
  },
  methods: {
    ...mapMutations(["setAccessToken", "setDataUser"]),
    login() {
      this.authService
        .login(this.email, this.password)
        .then((result) => {
          this.setAccessToken(result.data.access_token);
          this.dataUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dataUser() {
      this.usersService
        .getDataUser()
        .then((result) => {
          this.setDataUser(result.data);
          this.$router.push({ name: "MainBooks" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["getAccessToken", "getDataUser"]),
  },
};
</script>

<style scoped>
.containerHeaderBotons {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.hero {
  height: 948px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  background-image: url("../assets/img/bg.jpg");
  width: 100%;
}
.containerLogoBotons {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  min-height: 60px;
  margin: 0px auto;
  margin-top: 60px;
}
.containerLogo {
  width: 20%;
  text-align: left;
  min-height: 60px;
  cursor:pointer;
}
.containerBotons {
  width: 60%;
  min-height: 60px;
}
.containerBotons ul {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.containerBotons ul li {
  text-decoration: none;
  list-style: none;
  margin-right: 15px;
  color: white;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
}

.containerBotons ul li:hover {
  color: #d82a4e;
  cursor: pointer;
  font-weight: bold;
}

.boton {
  display: inline-block;
  min-width: 196px;
  text-align: center;
  border: none;
  padding: 15px 10px;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  color: #fff;
  cursor: pointer;
  background: #d82a4e;
}

.containerLogin {
  width: 20%;
}

.logo {
  height: 100%;
}
.headerTitulo {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0px auto;
  font-family: "RalewayBold", sans-serif;
  font-size: 60px;
  font-weight: 500;
  color: #fff;
  line-height: 72px;
  margin-top: 230px;
  justify-content: center;
}
.headerSubTitulo {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0px auto;
  margin-top: 40px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  line-height: 31px;
  justify-content: center;
}
.hero-section {
  margin-top: 40px;
}
.inputCabecera {
  height: 53px;
  width: 100%;
  padding: 0 30px;
  margin-right: 1px;
  float: none;
  border: none;
  font-size: 14px;
  margin-right: 10px;
  overflow: visible;
  text-rendering: auto;
  color: -internal-light-dark(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: textfield;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  -webkit-rtl-ordering: logical;
  cursor: text;
}

.inputCabecera:focus {
  outline: none;
}

@media (max-width: 1300px) {
  .containerLogoBotons{
    width: 100%;
  }
  .containerBotons {
    display: none;
  }
  .logo {
    height: 40px;
  }
  .containerLogo{   
    width: 50%;
  }
  .containerLogin{
    width: 50%;
  }
}
</style>
