import { useFetch } from '@/utils/apiUtils'
import axios from 'axios'

const menuApi = {

    getMenuList : async(param) => {
        return await useFetch('/api/v1/menu/list');
    }
}

export default menuApi;