<template>
  <div v-if="bookDetail" style="padding-top:30px;display:flex;flex-wrap:wrap">
    <HeaderCommunBP />
    <div
      v-if="bookDetail"
      style="width:60%;margin:0px auto;margin-top:10px;overflow: hidden;"
    >
      <img :src="apiUrl + bookDetail.image" alt="" srcset="" height="400" />
    </div>
    <div
      style="display:flex;justify-content:center;width:60%;margin:0px auto;margin-top:10px"
    >
      <span
        class="linkAcciones"
        v-if="bookDetail.userid == getDataUser.id"
        @click="
          $router.push({ name: 'EditBook', params: { id: bookDetail.id } })
        "
        >Editar</span
      >
      <span
        class="linkAcciones"
        v-if="bookDetail.userid == getDataUser.id"
        @click="deleteBook"
        >Eliminar</span
      >
      <span
        v-if="mostrarBotonVotar && getAccessToken"
        class="linkAcciones"
        @click="$router.push({ name: 'Rating', params: { id: bookDetail.id } })"
        >Votar</span
      >
    </div>
    <div class="containerData">
      <div class="row mt-5">
        <div class="col-12 col-md-6 titulo">
          Titulo:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.title }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Isbn:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.isbn }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Autor:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.author }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Resumen:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.summary }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Valoración:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.averach }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Cuantos Votaron:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.rates_count }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Precio ($):
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.price }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Creado:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.created_at }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Quien lo recomendo:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.username }}
        </div>
        <div class="col-12 col-md-6 titulo">
          Categoria:
        </div>
        <div class="col-12 col-md-6 datoDetalle">
          {{ bookDetail.categoryname }}
        </div>
      </div>
    </div>
    <div class="containerComentarios">
      <h3 style="font-weight:bold:margin-top:30px;margin-bottom:30px">
        Votaciones y comentarios
      </h3>
      <!-- inicio commentario -->
      <div
        class="containerRanting"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div class="contaninerComentario">
          <p style="text-align: end;" v-if="comment.user.id == getDataUser.id">
            <b-icon
              icon="trash-fill"
              style="cursor:pointer"
              @click="deleteComment(comment)"
            ></b-icon>
          </p>
          <p>
            {{ comment.description }}
          </p>
        </div>
        <div class="contaninerStars">
          <b-form-rating
            id="rating-readonly"
            :value="comment.rate"
            readonly
            show-value
            precision="1"
            no-border
            size="sm"
            color="#D82A4E"
          ></b-form-rating>
        </div>
        <div class="contaninerCommenter">
          {{ comment.user.name }}
        </div>
      </div>
      <!-- Fin commentario -->
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import BooksService from "../service/books.service";
import RatingService from "../service/ratings.service";
import FooterComponent from "./FooterBP";
import HeaderCommunBP from "./HeaderCommunBP";
import { mapGetters } from "vuex";
export default {
  components: { FooterComponent, HeaderCommunBP },
  data() {
    return {
      booksService: null,
      RatingService: null,
      bookDetail: null,
      apiUrl: process.env.VUE_APP_API_STORE,
      comments: [],
    };
  },
  created() {
    this.booksService = new BooksService();
    this.ratingService = new RatingService();
  },
  mounted() {
    this.getDetail();
    this.getComments();
  },
  methods: {
    getDetail() {
      this.booksService
        .getBookById(this.$route.params.id)
        .then((result) => {
          this.bookDetail = {
            id: result.data.data.id,
            title: result.data.data.title,
            image: result.data.data.image,
            isbn: result.data.data.isbn,
            author: result.data.data.author,
            summary: result.data.data.summary,
            averach: result.data.data.averach,
            rates_count: result.data.data.rates_count,
            price: result.data.data.price,
            created_at: result.data.data.created_at,
            userid: result.data.data.user.id,
            username: result.data.data.user.name,
            categoryid: result.data.data.category.id,
            categoryname: result.data.data.category.name,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getComments() {
      this.ratingService
        .getRatingsByBookforId(this.$route.params.id)
        .then((result) => {
          console.log(result.data.data);
          this.comments = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteComment(dataComment) {
      let eliminar = false;
      await this.$bvModal
        .msgBoxConfirm("Seguro desea eliminar el comentario?")
        .then((value) => {
          eliminar = value;
        })
        .catch((err) => {
          console.log(err);
        });

      if (eliminar == true) {
        this.ratingService
          .deleteRating(dataComment.id)
          .then(() => {
            this.comments = this.comments.filter((item) => {
              return item.id != dataComment.id;
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async deleteBook() {
      let eliminar = false;
      await this.$bvModal
        .msgBoxConfirm("Seguro desea eliminar el libro recomendado?")
        .then((value) => {
          eliminar = value;
        })
        .catch((err) => {
          console.log(err);
        });
      if (eliminar == true) {
        this.booksService
          .deleteBook(this.$route.params.id)
          .then((result) => {
            console.log(result);
            this.$router.push({ name: "MainBooks" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    ...mapGetters(["getDataUser", "getAccessToken"]),
    mostrarBotonVotar() {
      const existe = this.comments.filter((item) => {
        return item.user.id == this.getDataUser.id;
      });
      return existe.length == 0;
    },
  },
};
</script>

<style scoped>
.titulo {
  text-align: end;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #cbc6c6;
}
.datoDetalle {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  color: #d82a4e;
  border-bottom: 1px solid #cbc6c6;
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
.containerData {
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 0px auto;
  margin-top: 10px;
}
.containerComentarios {
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 0px auto;
  margin-top: 50px;
  flex-direction: column;
}
@media (max-width: 1300px) {
  .titulo {
    text-align: left;
    font-size: 16px;
  }
  .datoDetalle {
    text-align: justify;
    margin-bottom: 30px;
  }
  .containerData {
    width: 80%;
  }
  .containerComentarios {
    margin: 0px auto;
  width: 90%;
}
}
</style>
