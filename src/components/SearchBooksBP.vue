<template>
  <div style="width: 100%;">
    <div class="containerSearcher">
      <p class="titulo">Busca un libro</p>
      <div class="containerFormSearcher">
        <input type="text" name="" id="inputText" v-model.trim="textSearch" placeholder="Busqueda por: Título | Autor | ISBN"/>
        <div class="boton" @click="searchBooks()">
          Buscar
        </div>
      </div>
    </div>
    <Carrousel :items="booksFinds" v-if="booksFinds.length > 0" class="mt-5 sliderCarrousel" />
    <div class="containerResults">
      <div class="cardResult" v-for="(book,index) in booksFinds" :key="index" @click="$router.push({ name: 'Detail', params: { id: book.id } })">
        <div class="ContainerLeft">
          <h2 class="textSuperiorResult">{{book.title}}</h2>
          <p><span class="titleResult">Autor:</span><span class="dataResult">{{book.author}}</span></p>
          <p><span class="titleResult">Puntaje:</span><span class="dataResult">{{book.averach}}</span></p>
        </div>
        <div class="ContainerRight">
          <img :src="apiUrl+book.image" alt="" height="150">
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import BooksService from "../service/books.service";
import Carrousel from "./CarrouselBP";

export default {
  components: { Carrousel },
  data() {
    return {
      BooksService: null,
      textSearch: "",
      booksFinds: [],
      apiUrl: process.env.VUE_APP_API_STORE,
    };
  },
  created() {
    this.booksService = new BooksService();
  },
  methods: {
    searchBooks() {
      const data = {
        filter: this.textSearch,
        category_id: null,
        page: 1,
        per_page: 1000000,
      };
      this.booksService
        .searchBooks(data)
        .then((result) => {
          this.booksFinds = result.data.data.map((item) => {
            return {
              id: item.id,
              title: item.title,
              image: item.image,
              isbn: item.isbn,
              author: item.author,
              averach: item.averach,
              price: item.price,
              category: item.category.name,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.containerSearcher {
  width: 60%;
  margin: 0px auto;
  margin-top: 70px;
  display: flex;
  flex-wrap: wrap;
  background-color: #d82a4e;
  min-height: 300px;
  padding-bottom: 50px;
}
.titulo {
  font-family: "RalewayBold", sans-serif;
  font-size: 35px;
  text-align: center;
  width: 100%;
  font-weight: bold;
  color: white;
  margin-top: 50px;
  margin-bottom: 25px;
}

.containerFormSearcher {
  display: flex;
  height: 130px;
  background-color: white;
  width: 80%;
  margin: 0px auto;
  padding: 38px;
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
#inputText {
  width: 100%;
  margin-right: 30px;
  padding: 0 30px;
  margin-right: 18px;
  float: left;
  border: none;
  font-size: 14px;
  background: #edf4f6;
  overflow: visible;
}
#inputText:focus {
  outline: none;
  border-bottom: 2px solid #d82a4e;
}
.containerResults{
  display:none
}
.cardResult{
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin:0px auto;
    border-radius: 10px;
    margin-top: 15px;
    cursor: pointer;
        padding: 15px;
    border: 2px solid #d82a4e;
}

.textSuperiorResult{
  font-size: 20px;
  font-weight: bold;
}

.titleResult{
  font-size: 18px;
  font-weight: bold;
}

.dataResult{
  font-size: 18px;  
}
.ContainerLeft{
  display: flex;
  flex-direction: column;
  width: 80%;
}
.ContainerRight{  
  width: 20%;
  overflow: hidden;

}

@media (max-width: 900px) {
  .containerSearcher{
    width: 95%;    
  }
  .containerFormSearcher{
    flex-direction: column;
    height: 200px;
  }
  #inputText {    
  margin-right: 0px;
  height: 44px;
  margin-bottom: 10px;
}
.sliderCarrousel{
  display: none;
}
.containerResults{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
}
</style>
