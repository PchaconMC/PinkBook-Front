<template>
  <div class="containerLibros">
    <p class="tituloLibros">Libros en existencia</p>
    <p class="subTituloLibros">
    </p>
    <p>
      Elige una de nuestras categorias y disfruta de los mejores libros
      recomendados por los demas lectores, suscribete y recomienda un libro tu
      tambien
    </p>
    <div class="course-warp">
      <ul class="course-filter controls">
        <li
          v-for="(categoria, index) in categorias"
          :key="index"
          :class="{ control: true, active: controlActive == categoria.id }"
          @click="searchBooks(categoria.id)"
        >
          {{ categoria.name }}
        </li>
      </ul>
      <div class="row course-items-area" style="min-height:550px">
        <div
          class="mix col-md-4 col-sm-6"
          v-for="(book, index) in booksFinds"
          :key="index"
          style="cursor:pointer"
          @click="$router.push({ name: 'Detail', params: { id: book.id } })"
        >
          <div class="course-item">
            <div class="course-thumb set-bg">
              <img :src="apiUrl + book.image" alt="" style="width:100%" />
              <div class="price">Price: ${{ book.price }}</div>
            </div>
            <div class="course-info">
              <div class="course-text">
                <h5>{{ book.title }}</h5>
                <p>{{ book.summary }}</p>
                <div class="students">
                  <b-form-rating
                    id="rating-readonly"
                    :value="book.averach"
                    readonly
                    show-value
                    precision="1"
                    no-border
                    size="sm"
                    color="#D82A4E"
                  ></b-form-rating>
                </div>
              </div>
              <div class="course-author">
                <p>{{ book.author }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BooksService from "../service/books.service";
import CategoriesService from "../service/categories.service";
export default {
  data() {
    return {
      categoriesService: null,
      booksService: null,
      booksFinds: [],
      controlActive: 1,
      categorias: [],
      apiUrl: process.env.VUE_APP_API_STORE,
    };
  },
  created() {
    this.categoriesService = new CategoriesService();
    this.booksService = new BooksService();
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      this.categoriesService
        .allCategories()
        .then((result) => {
          const todas = [
            {
              books_count: 0,
              description: "",
              id: 0,
              image: "",
              name: "Todas",
            },
          ];
          this.categorias = todas.concat(result.data.data);
          this.searchBooks(this.categorias[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchBooks(idCategoria) {
      this.controlActive = idCategoria;
      const data = {
        filter: "",
        category_id: idCategoria==0?null:idCategoria,
        page: 1,
        per_page: 1000000,
      };
      this.booksService
        .searchBooks(data)
        .then((result) => {
          console.log(result);
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
              summary: item.category.summary,
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

<style lang="scss" scoped>
.containerLibros {
  width: 60%;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 90px;
}
.containerCardsLibros {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 50px;
  min-height: 600px;
  background-color: red;
  width: 100%;
}
.tituloLibros {
  margin: 0px auto;
  font-family: "RalewayBold", sans-serif;
  font-size: 60px;
  font-weight: 500;
  line-height: 72px;
  margin-top: 70px;
  justify-content: center;
}
.subTituloLibros {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  margin: 0px auto;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  line-height: 31px;
}

/* desde aqui */
.course-warp {
  max-width: 1559px;
  padding: 0 15px;
  margin: 0 auto -30px;
}

.course-item {
  margin-bottom: 30px;
}

.course-item .course-thumb {
  height: 270px;
  overflow: hidden;
}

.course-item .course-thumb .price {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  background: #d82a4e;
  display: inline-block;
  padding: 13px 19px;
  margin: 14px;
  position: absolute;
  z-index: 999999;
  top: 0px;
  left: 17px;
}

.course-item .course-thumb .categories {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  background: #d82a4e;
  position: absolute;
  top: 200px;
  left: 10px;
  padding: 13px 19px;
  margin: 14px;
}

.course-item .course-info {
  background: #edf4f6;
}

.course-item .course-info .course-text {
  padding: 45px 33px 25px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-item .course-info .course-text h5 {
  margin-bottom: 5px;
}

.course-item .course-info .course-text .students {
  font-size: 18px;
  font-weight: 600;
  color: #d82a4e;
}

.course-item .course-info .course-author {
  border-top: 1px solid #d4dee1;
  padding: 14px 33px;
  overflow: hidden;
}

.course-item .course-info .course-author .ca-pic {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  float: left;
}

.course-item .course-info .course-author p {
  padding-left: 0px;
  margin-bottom: 0;
  padding-top: 7px;
  font-weight: 600;
}

.course-item .course-info .course-author p span {
  color: #d82a4e;
}

.course-item.featured-course {
  position: relative;
  margin-bottom: 97px;
}

.course-item.featured-course:last-child {
  margin-bottom: 30px;
}

.course-item.featured-course:nth-child(2n) .course-thumb {
  left: auto;
  right: 0;
}

.course-item.featured-course .course-thumb {
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
}

.course-item.featured-course .fet-note {
  display: inline-block;
  background: #d82a4e;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 15px;
  margin-bottom: 20px;
}

.course-item.featured-course .course-info .course-text {
  padding: 70px 33px 25px;
}

.course-item.featured-course .course-info .course-text h5 {
  margin-bottom: 20px;
}

.course-item.featured-course .course-info .course-author {
  border-top: none;
  padding: 14px 14px 14px;
}

.course-filter {
  list-style: none;
  text-align: center;
  padding-top: 50px;
  margin-bottom: 60px;
}

.course-filter li {
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  color: #474747;
  padding: 12px 10px 5px;
  margin: 0 10px;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.active {
  color: #d82a4e !important;
  border-bottom: 4px solid #d82a4e !important;
}
.set-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
}

@media (max-width: 1300px) {
  .containerLibros{
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 30px;
  }
  .tituloLibros {
    font-size: 30px;    
    line-height: 40px;
    margin-top: 40px;    
}
.subTituloLibros {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 500;
    line-height: 25px;
    width: 90%;
    text-align: justify;
}

.course-filter li {    
    font-size: 14px;    
    padding: 12px 10px 5px;
    cursor: pointer;
    transition: all 0.3s;
}
.controls{
  padding-left: 0px;
}
}
</style>
