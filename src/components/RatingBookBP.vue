<template>
  <div v-if="bookDetail" style="padding-top:30px;display:flex;flex-wrap:wrap">
    <HeaderCommunBP/>
    <div v-if="bookDetail" style="width:60%;margin:0px auto;margin-top:10px">
      <img :src="apiUrl + bookDetail.image" alt="" srcset="" height="400" />
    </div>
    <div
      style="display:flex;justify-content:center;width:60%;margin:0px auto;margin-top:10px"
    >
      <div class="row mt-5">
        <div class="col-6 titulo">
          Titulo:
        </div>
        <div class="col-6 datoDetalle">
          {{ bookDetail.title }}
        </div>
        <div class="col-6 titulo">
          Autor:
        </div>
        <div class="col-6 datoDetalle">
          {{ bookDetail.author }}
        </div>
        <div class="col-6 titulo">
          Categoria:
        </div>
        <div class="col-6 datoDetalle">
          {{ bookDetail.categoryname }}
        </div>
        <div class="col-12" style="margin-top:30px">
          <b-form-textarea
            id="textarea"
            v-model="commentario"
            placeholder="Escribe tu comentario..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>
        <div class="col-12" style="margin-top:30px">
          <b-form-rating v-model="rating" variant="warning" class="mb-2"></b-form-rating>
        </div>
        <button class="site-btn boton" @click="createComentario">Guardar</button>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import BooksService from "../service/books.service";
import RatingsService from "../service/ratings.service";
import FooterComponent from "./FooterBP";
import HeaderCommunBP from './HeaderCommunBP'
import { mapGetters } from "vuex";
export default {
  components: { FooterComponent,HeaderCommunBP },
  data() {
    return {
      booksService: null,
      ratingsService:null,
      bookDetail: null,
      apiUrl: process.env.VUE_APP_API_STORE,
      rating:null,
      commentario:null
    };
  },
  created() {
    this.booksService = new BooksService();
    this.ratingsService=new RatingsService()
  },
  mounted() {
    this.getDetail();
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
    createComentario(){
      if(this.commentario==null || this.rating==null){
        this.$bvToast.toast("Debes completar el comentario y dar una valoración", {
            title: "Registro de comentario",
            autoHideDelay: 5000,
            appendToast: false,
            variant: "danger",
            solid: true,
          });
        return false
      }
      const data={
        description:this.commentario,
        rate:this.rating,
        book_id:this.$route.params.id
      }
      this.ratingsService.createRating(data)
      .then(() => {
        this.$bvToast.toast("Felicidades tu comentario de ha guardado", {
            title: "Registro de comentario",
            autoHideDelay: 5000,
            appendToast: false,
            variant: "danger",
            solid: true,
          });
        this.$router.push({name:'Detail',params:{id:this.$route.params.id}})  
      }).catch((err) => {
        console.log(err)
      });
    }
  },
  computed: {
    ...mapGetters(["getDataUser"]),
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
  margin:0px auto;
  margin-top:20px
}
</style>
