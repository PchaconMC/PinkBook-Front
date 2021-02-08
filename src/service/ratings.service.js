import axios from "axios";

export default class RatingsService {  
  createRating(data){

    /* {
      "description":"Es un libro fantastico, apropiado para mi hijo de 4 años",
      "rate":5,
      "book_id":1
    } */
    return axios.post(process.env.VUE_APP_API_PUBLIC + 'rate',data)
  }

  deleteRating(id){

    return axios.delete(process.env.VUE_APP_API_PUBLIC + `rate/${id}`)
  }

  getRatingsByBookforId(id){
    const data={
      book_id:id
    }
    return axios.post(process.env.VUE_APP_API_PUBLIC + `rate/search`,data)
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
