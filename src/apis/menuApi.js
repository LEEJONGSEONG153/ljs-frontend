import { useGet, useFetch, useDelete, usePut } from '@/utils/apiUtils';
import axios from 'axios'

const menuApi = {

    getMenuList : async(param) => {
        return await useGet('/api/v1/menu');
    },
    
    updateMenu : async(param) => {
        return await useFetch('/api/v1/menu',param);
    }
}

export default menuApi;