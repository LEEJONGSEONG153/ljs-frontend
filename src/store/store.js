import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import loginModule from './modules/loginModule';
import alertModule from "./modules/alertModule";
import confirmModule from "./modules/confirmModule";
import uploadModule from "./modules/uploadModule";

export default createStore({
    modules:{
        login: loginModule,
        alert : alertModule,
        confirm : confirmModule,
        upload : uploadModule,
    },
    plugins: [
        createPersistedState({
        key: 'vuexStore',
        storage: window.localStorage,
        paths: ['login']
        })
    ]
});

