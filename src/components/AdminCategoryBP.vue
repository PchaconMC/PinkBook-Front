<template>
  <div style="padding-top:30px;display:flex;flex-wrap:wrap">
    <HeaderCommunBP />
    <div class="columnRellenoIzquierda"></div>
    <div id="imagenPreview" v-if="imagenModificada || !modoEdicion"></div>
    <div id="imagenPreviewOriginal" v-else>
      <img :src="apiUrl + imagenOriginal" alt="" height="300" />
    </div>
    <div id="containerForm">
      <div class="row mt-5">
        <div class="col-3 titulo">
          Nombre:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-input
            v-model.trim="name"
            placeholder="Como se llama la categoría?"
          ></b-form-input>
        </div>
        <div class="col-3 titulo">
          descripcion:
        </div>
        <div class="col-9 datoDetalle">
          <b-form-textarea
            id="textarea"
            v-model.trim="descripcion"
            placeholder="De que va la categoría..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
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
    <div class="col-12 mt-5">
      <button
        class="site-btn boton mr-5"
        @click="cancelarModoEdicion"
        v-if="modoEdicion"
      >
        Cancelar
      </button>
      <button
        class="site-btn boton"
        @click="modoEdicion ? editarCategoria() : createCategoria()"
      >
        <span v-if="!modoEdicion">Guardar</span>
        <span v-else>Guardar Cambios</span>
      </button>
    </div>
    <div id="containerTable">
      <b-table
        striped
        hover
        :items="categorias"
        :busy="categorias.length == 0"
        :fields="fields"
        class="tableDestop"
      >
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="deleteCategory(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Borrar
          </b-button>
          <b-button
            size="sm"
            @click="loadModoEdit(row.item, row.index, $event.target)"
            class="mr-1 mt-2"
          >
            Editar
          </b-button>
        </template>
        <template #cell(image)="row">
          <img :src="apiUrl + row.value" height="50" />
        </template>
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template></b-table
      >
      <b-table
      responsive
        striped
        hover
        :items="categorias"
        :busy="categorias.length == 0"
        :fields="fieldsMovil"
        class="tableMovil"
      >
        <template #cell(actions)="row" >
          <b-button
            size="sm"
            @click="deleteCategory(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Borrar
          </b-button>
          <b-button
            size="sm"
            @click="loadModoEdit(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Editar
          </b-button>
        </template>        
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template></b-table
      >
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import CategoriesService from "../service/categories.service";
import FooterComponent from "./FooterBP";
import HeaderCommunBP from "./HeaderCommunBP";
import { mapGetters } from "vuex";
export default {
  components: { FooterComponent, HeaderCommunBP },
  data() {
    return {
      categoriesService: null,
      categoriaSeleccionada: null,
      categorias: [],
      name: null,
      descripcion: null,
      imagen: null,
      image64: null,
      imagenOriginal: null,
      imagenModificada: false,
      fields: [
        { key: "id", label: "ID", sortable: true, class: "text-center" },
        { key: "name", label: "Nombre", sortable: true, sortDirection: "desc" },
        {
          key: "description",
          label: "Descripcion",
          sortable: true,
          class: "text-center",
        },
        {
          key: "books_count",
          label: "Libros",
          sortable: true,
          class: "text-center",
        },
        {
          key: "image",
          label: "Imagen",
          sortable: false,
          class: "text-center",
        },
        { key: "actions", label: "Actions" },
      ],
      fieldsMovil: [        
        { key: "name", label: "Nombre", sortable: true, sortDirection: "desc" },        
        { key: "actions", label: "Actions" },
      ],
      apiUrl: process.env.VUE_APP_API_STORE,
      modoEdicion: false,
    };
  },
  created() {
    this.categoriesService = new CategoriesService();
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      this.categoriesService
        .allCategories()
        .then((result) => {
          this.categorias = [];
          this.categorias = [...result.data.data];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createCategoria() {
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
      if (this.imagen != null && !this.esImagen(this.imagen.name)) {
        this.$bvToast.toast("El archivo debe ser de imagen", {
          title: "Registro de recomendación",
          autoHideDelay: 5000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
        return false;
      }

      let dataCategory = new FormData();
      dataCategory.append("name", this.name);
      dataCategory.append("description", this.descripcion);
      dataCategory.append("books_count", 0);
      if (this.imagen != null) {
        dataCategory.append("photo", this.imagen);
      }
      this.categoriesService
        .createCategories(dataCategory)
        .then(() => {
          this.$bvToast.toast(
            "Felicidades la categoria se creo correctamente",
            {
              title: "Registro de categoria",
              autoHideDelay: 5000,
              appendToast: false,
              variant: "danger",
              solid: true,
            }
          );
          this.getAllCategories();
          this.name = null;
          this.descripcion = null;
          this.imagen = null;
          this.imagenModificada = false;
          let preview = document.getElementById("imagenPreview");
          preview.removeChild(preview.firstChild);
          preview.innerHTML = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validarInformacion() {
      if (this.name == null || this.name == "") {
        return false;
      }
      if (this.descripcion == null || this.descripcion == "") {
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
    async deleteCategory(data) {
      let eliminar = false;
      await this.$bvModal
        .msgBoxConfirm("Seguro desea eliminar la categoria?")
        .then((value) => {
          eliminar = value;
        })
        .catch((err) => {
          console.log(err);
        });
      if (eliminar == true) {
        this.categoriesService
          .deleteCategories(data.id)
          .then(() => {
            this.categorias = this.categorias.filter((item) => {
              return item.id != data.id;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async editarCategoria() {
      let eliminar = false;
      await this.$bvModal
        .msgBoxConfirm(
          "Seguro desea Guardar los cambios realizados a la categoria?"
        )
        .then((value) => {
          eliminar = value;
        })
        .catch((err) => {
          console.log(err);
        });
      if (eliminar == true) {
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

        let dataCategory = new FormData();
        dataCategory.append("id", this.idInEdicion);
        dataCategory.append("name", this.name);
        dataCategory.append("description", this.descripcion);
        dataCategory.append("books_count", 0);
        if (this.imagen != null && this.imagenModificada) {
          dataCategory.append("image", this.imagen);
          dataCategory.append("photo", this.imagen);
        }
        this.categoriesService
          .updateCategories(dataCategory)
          .then(() => {
            this.$bvToast.toast(
              "Felicidades la categoria se editó de forma correcta correctamente",
              {
                title: "Registro de categoria",
                autoHideDelay: 5000,
                appendToast: false,
                variant: "danger",
                solid: true,
              }
            );
            this.getAllCategories();
            this.cancelarModoEdicion();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    loadModoEdit(data) {
      this.modoEdicion = true;
      this.name = data.name;
      this.descripcion = data.description;
      this.idInEdicion = data.id;
      this.imagenOriginal = data.image;
      try {
        let preview = document.getElementById("imagenPreview");
        preview.removeChild(preview.firstChild);
        this.imagen = null;
      } catch (error) {
        this.imagen = null;
      }
      this.modoEdicion = true;
      this.imagenModificada = false;
    },
    cancelarModoEdicion() {
      this.name = null;
      this.descripcion = null;
      this.idInEdicion = null;
      this.imagenOriginal = null;
      this.imagenModificada = false;
      try {
        let preview = document.getElementById("imagenPreview");
        preview.removeChild(preview.firstChild);
        this.imagen = null;
      } catch (error) {
        this.imagen = null;
      }
      this.modoEdicion = false;
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
      if (val) {
        if (this.esImagen(val.name)) {
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
#imagenPreviewOriginal {
  width: 20%;
  margin: 0px auto;
  padding-top: 50px;
  text-align: right;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
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
#containerTable {
  width: 60%;
  margin: 0px auto;
  margin-top: 10px;
  margin-top: 50px;
}
.tableMovil {
  display: none;
  width: 100%;
}
.tableDestop {
  display: block;
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
  #containerTable {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0px;
    margin-top: 50px;
    justify-content: center;
  }
  .tableMovil {
    display: block;
  }
  .tableDestop {
    display: none;
  }
  #imagenPreview,#imagenPreviewOriginal {
    display: none;
  }
}
</style>
