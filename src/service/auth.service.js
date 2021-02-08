import axios from "axios";
export default class AuthService {
  login(email, password) {
    let data = {
      password,
      email,
    };
    return axios.post(process.env.VUE_APP_API_PUBLIC + "auth/login", data);
  }  

  logout() {    
    return axios.post(process.env.VUE_APP_API_PUBLIC + "auth/logout");
  }  
}
