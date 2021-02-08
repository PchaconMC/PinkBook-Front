<template>
  <div class="containerCategories">
    <p class="tituloCategorias">Categorias de Libros</p>
    <p class="subTituloCategorias">
    </p>
    <div class="containerCardsCategorias">
      <div
        class="containerCardCategoria"
        v-for="(categoria, index) in categorias"
        :key="index"
      >
        <div class="imagenCategoria">
          <img
            v-bind:src="
              categoria.image
                ? apiUrl + categoria.image
                : 'https://loremflickr.com/350/350/book?random=' + categoria.id
            "
            alt=""
            :height="300"
          />
        </div>
        <div class="contenidoCategoria">
          <h5 class="titulo">{{ categoria.name }}</h5>
          <p class="descripcion">{{ categoria.description }}</p>
          <span class="cantidad">{{ categoria.books_count }} libros</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesService from "../service/categories.service";
export default {
  data() {
    return {
      categoriesService: null,
      categorias: [],
      apiUrl: process.env.VUE_APP_API_STORE,
    };
  },
  created() {
    this.categoriesService = new CategoriesService();
  },
  mounted() {
    this.categoriesService
      .allCategories()
      .then((result) => {
        this.categorias = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.containerCategories {
  width: 60%;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
}
.containerCardsCategorias {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 50px;
}
.tituloCategorias {
  margin: 0px auto;
  font-family: "RalewayBold", sans-serif;
  font-size: 60px;
  font-weight: 500;
  line-height: 72px;
  margin-top: 70px;
  justify-content: center;
}
.subTituloCategorias {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0px auto;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  line-height: 31px;
}
.containerCardCategoria {
  display: flex;
  flex-wrap: wrap;
  min-height: 50px;
  width: 30%;
  margin-bottom: 34px;
  background: #edf4f6;
  transition: all 0.4s;
}
.containerCardCategoria:hover {
  .contenidoCategoria {
    background: #d82a4e;
  }
  .titulo,
  .descripcion,
  .cantidad {
    color: white;
  }
}
.imagenCategoria {
  min-height: 148px;
  width: 100%;
  transition: all 0.2s;
  overflow: hidden;
}
.contenidoCategoria {
  width: 100%;
    padding: 40px 35px;
    transition: all 0.4s;
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.titulo {
  margin-bottom: 5px;
  font-family: "RalewayBold", sans-serif;
  font-size: 20px;
  transition: all 0.4s;
}
.descripcion {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 20px;
  color: black;
  line-height: 2.2;
  font-weight: 500;
  transition: all 0.4s;
}
.cantidad {
  font-size: 18px;
  font-weight: 600;
  color: #d82a4e;
  transition: all 0.4s;
}

@media (max-width: 1300px) {
  .containerCategories {
    width: 100%;
  }
  .tituloCategorias {
    font-size: 30px;
    line-height: 35px;
    margin-top: 40px;
    width: 90%;
  }
  .subTituloCategorias {
    margin-top: 8px;
    font-size: 15px;
    line-height: 20px;
    width: 90%;
    text-align: justify;
  }
  .containerCardsCategorias {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
  }
  .containerCardCategoria {
    width: 100%;
    margin: 0px;
    margin-bottom: 20px;
  }
  .titulo {
    font-size: 20px;
  }
  .descripcion {
    font-size: 16px;
    text-align: justify;
  }
  .cantidad {
    font-size: 22px;
  }
}
</style>
