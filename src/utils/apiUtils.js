import axios from 'axios';

const apiUrl = process.env.VUE_APP_BACKEND_HOST

/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const useFetch = async (url, params) => {
    try {
        console.log('here')
        const response = await axios.post(`${apiUrl}${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}