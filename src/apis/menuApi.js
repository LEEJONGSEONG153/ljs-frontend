import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import axios from 'axios'

const menuApi = {

    getMenuList : async(param) => {
        return await useGet('/api/v1/menu');
    },
    
    updateMenu : async(param) => {
        return await usePost('/api/v1/menu',param);
    },

    deleteMenu : async (param) => {
        console.log(param);
        return await useDelete('/api/v1/menu', param)
    }
}

export default menuApi;