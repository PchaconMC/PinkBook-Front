<template>
  <div style="padding-top:30px;display:flex;flex-wrap:wrap">
    <HeaderCommunBP />
    <div class="columnRellenoIzquierda"></div>
    <div id="imagenPreview" v-if="imagenModificada"></div>
    <div id="imagenPreviewInicial" v-else>
      <img :src="apiUrl + this.imagenInicial" alt="" height="80px"/>
    </div>
    <div id="containerForm">
      <div class="row mt-5">
        <div class="col-3 titulo">
          Titulo:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-input
            v-model.trim="titulo"
            placeholder="Como se llama el libro?"
          ></b-form-input>
        </div>
        <div class="col-3 titulo">
          Isbn:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-input
            v-model.trim="codigo"
            placeholder="Codigo del libro"
          ></b-form-input>
        </div>
        <div class="col-3 titulo">
          Autor:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-input
            v-model.trim="autor"
            placeholder="Quien lo escribio?"
          ></b-form-input>
        </div>
        <div class="col-3 titulo">
          Resumen:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-textarea
            id="textarea"
            v-model.trim="resumen"
            placeholder="Escribe el resumen de tu libro..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div class="col-3 titulo">
          Precio ($):
        </div>
        <div class="col-9 datoDetalle">
          <b-form-input
            v-model="precio"
            type="number"
            placeholder="Precio del libro"
            :min="0"
          ></b-form-input>
        </div>
        <div class="col-3 titulo">
          Categoria:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-select
            v-model="categoriaSeleccionada"
            :options="categorias"
          ></b-form-select>
        </div>
        <div class="col-3 titulo">
          Imagen:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-file
            v-model="imagen"
            :state="Boolean(imagen)"
            placeholder="Elige una imagen o sueltala aqui..."
            drop-placeholder="Drop file here..."
            accept="image/*"
          ></b-form-file>
        </div>        
      </div>
    </div>    
    <div id="rellenoDerecha"></div>
    <div style="width:100%">
          <button class="site-btn boton" @click="editBook">
            Guardar Edición
          </button>
        </div>
    <FooterComponent />
  </div>
</template>

<script>
import BooksService from "../service/books.service";
import CategoriesService from "../service/categories.service";
import FooterComponent from "./FooterBP";
import HeaderCommunBP from "./HeaderCommunBP";
import { mapGetters } from "vuex";
export default {
  components: { FooterComponent, HeaderCommunBP },
  data() {
    return {
      booksService: null,
      categoriesService: null,
      categoriaSeleccionada: null,
      categorias: [],
      titulo: null,
      codigo: null,
      autor: null,
      resumen: null,
      precio: null,
      imagen: null,
      image64: null,
      images: [],
      averach: null,
      imagenModificada: false,
      apiUrl: process.env.VUE_APP_API_STORE,
      imagenInicial: null,
    };
  },
  created() {
    this.booksService = new BooksService();
    this.categoriesService = new CategoriesService();
  },
  mounted() {
    this.getAllCategories();
    this.getDetail();
  },
  methods: {
    getAllCategories() {
      this.categoriesService
        .allCategories()
        .then((result) => {
          this.categorias = result.data.data.map((item) => {
            return { text: item.name, value: item.id, disabled: false };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDetail() {
      this.booksService
        .getBookById(this.$route.params.id)
        .then((result) => {
          this.titulo = result.data.data.title;
          this.imagenInicial = result.data.data.image;
          this.codigo = result.data.data.isbn;
          this.autor = result.data.data.author;
          this.resumen = result.data.data.summary;
          this.averach = result.data.data.averach;
          this.precio = result.data.data.price;
          this.categoriaSeleccionada = result.data.data.category.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editBook() {
      if (!this.validarInformacion()) {
        this.$bvToast.toast("Debes completar todos los campos", {
          title: "Registro de recomendación",
          autoHideDelay: 5000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
        return false;
      }
      console.log();
      if (
        this.imagen != null &&
        !this.esImagen(this.imagen.name) &&
        this.imagenModificada
      ) {
        this.$bvToast.toast("El archivo debe ser de imagen", {
          title: "Registro de recomendación",
          autoHideDelay: 5000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
        return false;
      }

      let dataBook = new FormData();
      dataBook.append("id", this.$route.params.id);
      dataBook.append("title", this.titulo);
      dataBook.append("isbn", this.codigo);
      dataBook.append("author", this.autor);
      dataBook.append("summary", this.resumen);
      dataBook.append("averach", 5);
      dataBook.append("price", this.precio);
      dataBook.append("category_id", this.categoriaSeleccionada);
      if (this.imagenModificada) {
        dataBook.append("image", this.imagen);
      }
      this.booksService
        .editBook(dataBook)
        .then(() => {
          this.$bvToast.toast("Felicidades tu recomendacion se ha editado", {
            title: "Edición de recomendación",
            autoHideDelay: 5000,
            appendToast: false,
            variant: "danger",
            solid: true,
          });
          setTimeout(() => {
            this.$router.push({
              name: "Detail",
              params: { id: this.$route.params.id },
            });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validarInformacion() {
      if (this.titulo == null || this.titulo == "") {
        console.log("entre1");
        return false;
      }
      if (this.autor == null || this.autor == "") {
        console.log("entre1");
        return false;
      }
      if (this.codigo == null || this.codigo == "") {
        console.log("entre1");
        return false;
      }
      if (this.precio == null || this.precio == "") {
        console.log("entre2");
        return false;
      }
      if (this.resumen == null || this.resumen == "") {
        console.log("entre1");
        return false;
      }
      if (this.categoriaSeleccionada == null) {
        console.log("entre1");
        return false;
      }
      return true;
    },
    esImagen(nombre) {
      return (
        nombre.indexOf(".jpg") > -1 ||
        nombre.indexOf(".png") > -1 ||
        nombre.indexOf(".jpeg") > -1
      );
    },
  },
  computed: {
    ...mapGetters(["getDataUser", "getAccessToken"]),
    getImage() {
      return this.image64;
    },
  },
  watch: {
    imagen(val) {
      this.imagenModificada = true;
      let reader = new FileReader();
      if (val && val.name) {
        if (this.esImagen(val.name)) {
          console.log("Es imagen");
          try {
            reader.readAsDataURL(val);
            reader.onload = function() {
              let preview = document.getElementById("imagenPreview"),
                imageX = document.createElement("img");

              //imageX.height = 300;
              preview.innerHTML = "";
              imageX.src = reader.result;
              imageX.style = "width: 100%;height: fit-content;";
              preview.append(imageX);
            };
          } catch (error) {
            let preview = document.getElementById("imagenPreview");
            preview.removeChild(preview.firstChild);
            preview.innerHTML = "";
            this.imagen = null;
          }
        } else {
          console.log("No Es imagen");
          let preview = document.getElementById("imagenPreview");
          preview.removeChild(preview.firstChild);
        }
      }
    },
  },
};
</script>

<style scoped>
.titulo {
  text-align: end;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.datoDetalle {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #d82a4e;
  margin-bottom: 10px;
}
.linkAcciones {
  background-color: #d82a4d;
  padding: 9px;
  border-radius: 20px;
  color: white;
  font-size: 17px;
  letter-spacing: 3px;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.4s all;
}
.linkAcciones:hover {
  background-color: #e94465;
}
.containerRanting {
  padding: 30px;
  border: 2px solid #d82a4e;
  border-radius: 14px;
  margin-bottom: 15px;
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
  margin: 0px auto;
  margin-top: 20px;
}

.columnRellenoIzquierda {
  display: block;
  width: 10%;
  margin: 0px auto;
  margin-top: 10px;
}
#imagenPreview {
  width: 20%;
  margin: 0px auto;
  padding-top: 50px;
  text-align: right;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
#containerForm {
  display: flex;
  justify-content: center;
  width: 40%;
  margin: 0px auto;
  margin-top: 10px;
}
#rellenoDerecha {
  width: 20%;
  margin: 0px auto;
  margin-top: 10px;
}
#imagenPreviewInicial {
  width: 20%;
  margin: 0px auto;
  padding-top: 50px;
  text-align: right;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
@media (max-width: 900px) {
  .columnRellenoIzquierda {
    display: none;
  }
  #containerForm {
    width: 80%;
  }
  #rellenoDerecha {
    display: none;
  }
  .titulo {
    font-size: 14px;
  }
  #imagenPreview,#imagenPreviewInicial {
    display: none;
  }
}
</style>
