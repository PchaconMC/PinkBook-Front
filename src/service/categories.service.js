import axios from "axios";

export default class CategoriesService {
  allCategories() {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "category/search",{filter:""});
  }
  createCategories(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "category",data);
  }
  getCategorieById(id) {
    return axios.get(process.env.VUE_APP_API_PUBLIC + `category/${id}`);
  }
  updateCategories(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "category/update",data);
  }
  deleteCategories(id) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + `category/${id}`);
  }
}
