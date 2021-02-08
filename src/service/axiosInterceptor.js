import axios from "axios";
import router from "../router";
import { store } from "../store/store";
axios.interceptors.request.use(
  function(config) {
    const token = store.getters.getAccessToken;
    config.headers.common['X-Requested-With'] = "XMLHttpRequest";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {    
    if (error.response.status == "401") {
      store.commit("resetState");
      router.push("/login").catch(() => {});
    }
    return Promise.reject(error);
  }
);
