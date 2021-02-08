import axios from "axios";

export default class UsersService {
  getDataUser(){
    return axios.post(process.env.VUE_APP_API_PUBLIC + "auth/me");
  }
  createUser(data){
    return axios.post(process.env.VUE_APP_API_PUBLIC + "user",data);
  }
  /* allUsers() {
    return axios.get(process.env.VUE_APP_API_PUBLIC + "users/");
  }    
  crearUser(data) {
    return axios.post(process.env.VUE_APP_API_PUBLIC + "users/create", data);
  }
  editarUser(data) {
    return axios.put(process.env.VUE_APP_API_PUBLIC + "users/update", data);
  }
  eliminarUser(data) {
    return axios.delete(process.env.VUE_APP_API_PUBLIC + "users/delete", {
      data: data,
    });
  }
  subirAvatar(data) {
    return axios.post(
      process.env.VUE_APP_API_PUBLIC + "users/avatar/create",
      data
    );
  }
  eliminarAvatar(data) {
    return axios.delete(
      process.env.VUE_APP_API_PUBLIC + "users/avatar/delete",
      { data: data }
    );
  } */
}
