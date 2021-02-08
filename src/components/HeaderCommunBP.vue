
<template>
  <div class="containerHeaderBotons">
    <div class="hero">
      <div class="containerLogoBotons">
        <div class="containerLogo" @click="$router.push({name:'MainBooks'}).catch(()=>{})" style="cursor:pointer">
          <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret id="menuMovil">
            <template #button-content>
              <span style="color:#d82a4e;font-weight:bold;font-size:30px" >&#x2630;</span><span class="sr-only" >Menu</span>
            </template>
            <b-dropdown-item href="#">Inicio</b-dropdown-item>
            <b-dropdown-item href="#">Quienes Somos</b-dropdown-item>
            <b-dropdown-item href="#" v-if="getAccessToken">Libros</b-dropdown-item>
            <b-dropdown-item href="#/create-book">Recomienda un libro</b-dropdown-item>
            <b-dropdown-item href="#/admin-category" v-if="getAccessToken && getDataUser.role == 'ADMIN'">Admin Categorías</b-dropdown-item>
          </b-dropdown>
          <img src="../assets/img/logo.png" alt="logo pink book" class="logo" height="50" />
        </div>
        <div class="containerBotons">
          <ul>
            <li @click="$router.push({name:'MainBooks'}).catch(()=>{})" >
              Inicio
            </li>
            <li>
              Quienes somos
            </li>
            <li>
              Libros
            </li>
            <li @click="$router.push({name:'CreateBook'}).catch(()=>{})" v-if="getAccessToken">
              Recomienda un libro
            </li>
            <li @click="$router.push({name:'AdminCategories'}).catch(()=>{})" v-if="getAccessToken && getDataUser.role=='ADMIN'" >
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
      authService:null,
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
      this.authService.logout()
      .then(() => {
        this.resetState();  
      }).catch((err) => {     
        console.log(err)   
      });      
    },
    crearUsuario() {
      const data = {
        role: "READER",
        name: this.name.toLowerCase(),
        email: this.email.toLowerCase(),
        password: this.password,
      };
      this.usersService
        .createUser(data)
        .then((result) => {
          console.log(result);
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
    height: 100px;
    background-color: gray;
    width: 100%;
}
.containerLogoBotons {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  min-height: 60px;
  margin: 0px auto;  
  margin-top: 16px;  
}
.containerLogo {
  width: 20%;
  text-align: left;
  min-height: 60px;
  display: flex;
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
}
</style>
