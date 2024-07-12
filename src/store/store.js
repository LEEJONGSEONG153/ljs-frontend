import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({

  
  plugins: [
    createPersistedState({
      key: 'vuexStore',
      storage: window.localStorage,
      paths: []
    })
  ]
});

