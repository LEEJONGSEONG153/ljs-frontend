import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loginModule from './modules/loginModule';
import alertModule from "./modules/alertModule";
import confirmModule from "./modules/confirmModule";

export default createStore({
    modules:{
        login: loginModule,
        alert : alertModule,
        confirm : confirmModule,
    },
    plugins: [
        createPersistedState({
        key: 'vuexStore',
        storage: window.localStorage,
        paths: ['login']
        })
    ]
});

