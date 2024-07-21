import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loginModule from './module/loginModule';

export default createStore({
    modules:{
        login: loginModule
    },
    plugins: [
        createPersistedState({
        key: 'vuexStore',
        storage: window.localStorage,
        paths: ['login']
        })
    ]
});

