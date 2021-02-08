<template>
  <div class="containerHeaderBotons">
    <div :class="{hero:true,alturaLogueado:getAccessToken}">
      <div class="containerLogoBotons">
        <div
          class="containerLogo"
          @click="$router.push({ name: 'MainBooks' }).catch(() => {})"
        >
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
          <img src="../assets/img/logo.png" alt="logo pink book" class="logo" height="50" />
        </div>
        <div class="containerBotons">
          <ul>
            <li @click="$router.push({ name: 'MainBooks' }).catch(() => {})">
              Inicio
            </li>
            <li>
              Quienes somos
            </li>
            <li>
              Libros
            </li>
            <li
              @click="$router.push({ name: 'CreateBook' }).catch(() => {})"
              v-if="getAccessToken"
            >
              Recomienda un libro
            </li>
            <li
              @click="$router.push({ name: 'AdminCategories' }).catch(() => {})"
              v-if="getAccessToken && getDataUser.role == 'ADMIN'"
            >
              Admin Categorías
            </li>
          </ul>
        </div>
        <div class="containerLogin">                    
          <div
            class="boton botonLogin"
            @click="$router.push({ name: 'Login' })"
            v-if="!getAccessToken"
          >
            LOGIN
          </div>
          <div v-else>
            <b-avatar
              variant="primary"
              :text="getDataUser.name.slice(0, 2)"
            ></b-avatar>
            <b-button pill variant="primary" class="ml-2" @click="logout"
              >Logout</b-button
            >
          </div>                    
        </div>
      </div>
      <div :class="{headerTitulo:true,h1Logueado:getAccessToken}">
        Los Mejores Libros
      </div>
      <div class="headerSubTitulo">
        Los mejores libros y comentarios encuantralos aquí
      </div>
      <div
        class="hero-section hero-section-register set-bg"
        data-setbg="/img/bg.jpg"
        v-if="!getAccessToken"
      >
        <div class="container">
          <form class="intro-newslatter text-center">
            <div class="row justify-content-center">
              <div class="col-12 col-md-6 mb-3">
                <input
                  style="width:100%"
                  type="text"
                  placeholder="Nombre"
                  class="inputCabecera"
                  v-model="name"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <input
                  style="width:100%"
                  type="email"
                  placeholder="Email"
                  class="inputCabecera"
                  v-model="email"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <input
                  style="width:100%"
                  type="password"
                  placeholder="Password"
                  class="inputCabecera"
                  v-model="password"
                />
              </div>
              <div class="col-12 col-md-6 mb-3">
                <input
                  style="width:100%"
                  type="password"
                  placeholder="Confirmación del Pasword"
                  class="inputCabecera"
                  v-model="rePassword"
                />
              </div>
              <div class="col-lg-12 mt-3">
                <button class="site-btn btn-block boton" @click="crearUsuario">
                  Crear cuenta
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
import { mapGetters, mapMutations } from "vuex";
import UsersService from "../service/users.service";
import AuthService from "../service/auth.service";
export default {
  data() {
    return {
      usersService: null,
      authService: null,
      name: null,
      email: null,
      password: null,
      rePassword: null,
    };
  },
  created() {
    this.usersService = new UsersService();
    this.authService = new AuthService();
  },
  methods: {
    ...mapMutations(["resetState"]),
    logout() {
      this.authService
        .logout()
        .then(() => {
          this.resetState();
        })
        .catch((err) => {
          console.log(err);
        });
        this.resetState();
    },
    crearUsuario() {
      const validacion=this.validarCampos()
      if(validacion.invalido){
        this.$bvToast.toast(
            validacion.mensaje,
            {
              title: "Registro de usuarios",
              autoHideDelay: 5000,
              appendToast: false,
              variant: "warning",
              solid: true,
            }
          );
          return false
      }
      const data = {
        role: "READER",
        name: this.name.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
      };
      this.usersService
        .createUser(data)
        .then(() => {
          this.$bvToast.toast(
            "Felicidades te haz registrado, haz click en el login y empieza disfrutar",
            {
              title: "Registro de usuarios",
              autoHideDelay: 5000,
              appendToast: false,
              variant: "danger",
              solid: true,
            }
          );
          this.name=null
          this.email=null
          this.password=null
          this.rePassword=null
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validarCampos(){
      let validacion={
        invalido:false,
        mensaje:""
      }

      let emailRegex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //eslint-disable-line
     
      if(this.name=="" || this.name==null){
        validacion.invalido=true
        validacion.mensaje="Debe completar el nombre"
        return validacion
      }
      if(this.email=="" || this.email==null){
        validacion.invalido=true
        validacion.mensaje="Debe completar el email"
        return validacion
      }
      
      if(!emailRegex.test(this.email)){
        validacion.invalido=true
        validacion.mensaje="El emil no es valido"
        return validacion
      }
      if(this.password=="" || this.password==null || this.password.length<6){
        validacion.invalido=true
        validacion.mensaje="Debe completar el password mayor de 6 caracteres"
        return validacion
      }
      if(this.password!=this.rePassword){
        validacion.invalido=true
        validacion.mensaje="Los passwords deben ser identicos"
        return validacion
      }

      return validacion
    }
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
  display: flex;
  width: 20%;
  text-align: left;
  min-height: 60px;
  cursor: pointer;
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
  margin-top: 130px;
}
.inputCabecera {
  height: 53px;
  width: 46%;
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
#menuMovil{
    display: none;
  }

  
@media (max-width: 1300px) {
  #menuMovil{
    display: block;
  }
  .containerLogoBotons{
    margin-left: 30px;
    margin-right: 30px;
    width: 90%;
  }
  .containerBotons {
    display: none;
  }
  .logo {
    height: 40px;
  }
  .containerLogo {
    width: 50%;
  }
  .containerLogin {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    align-items: flex-start;
  }
  .botonLogin {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 77px;
    min-width: 77px;
    font-size: 10px;
  }
  .hero-section-register {
    margin-top: 16px !important;
  }
  .headerTitulo {
    font-size: 30px;
  }
  .headerSubTitulo {
    margin-top: 0px;
  }
  .alturaLogueado{
  max-height: 525px;
}
.h1Logueado{
  margin-top: 106px;
}
}
</style>
