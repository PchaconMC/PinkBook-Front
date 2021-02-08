import axios from "axios";

export default class BooksService {
  searchBooks(data){
    return axios.post(process.env.VUE_APP_API_PUBLIC + 'book/search',data)
  }

  getBookById(id){
    return axios.get(process.env.VUE_APP_API_PUBLIC + `book/${id}`)
  }

  createBook(data){
    return axios.post(process.env.VUE_APP_API_PUBLIC + `book`,data)
  }

  editBook(data){
    return axios.post(process.env.VUE_APP_API_PUBLIC + `book/update`,data)
  }

  deleteBook(id){
    return axios.delete(process.env.VUE_APP_API_PUBLIC + `book/${id}`)
  }

  /* allBooks() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "books/todas");
  }
  crearBooks(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "books/create", data);
  }
  editarBooks(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "books/update", data);
  }
  eliminarBooks(data) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "books/delete", {
      data: data,
    });
  } */
}
