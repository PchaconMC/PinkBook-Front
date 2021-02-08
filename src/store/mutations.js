const getDefaultState = () => {
  return {
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
  };
};

export const mutations = {
  setAccessToken(state, accessToken) {
    state.access_token = accessToken;
  },
  resetState(state) {
    //reset del state
    Object.assign(state, getDefaultState());
  },
  setDataUser(state, payload) {
    //actualiza los datos del usuario
    state.data_user = payload;
  },
  /* setUsuario(state, payload) {
    //actualiza los datos del usuario medico en edicion
    state.usuario = { ...payload };
  }, */
};
