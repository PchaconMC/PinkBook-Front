import Vue from "vue";
import Vuex from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

Vue.use(Vuex);
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "pinkbook",
      paths: ["data_user", "access_token"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    data_user: {
      id: null,
      role: null,
      name: null,
      email: null,
      email_verified_at: null,
      photo: null,
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    access_token: null,
  },
  mutations,
  actions,
  getters,
});
