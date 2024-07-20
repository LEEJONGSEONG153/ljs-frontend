import axios from 'axios';

//const apiUrl = process.env.VUE_APP_API_URL_API
const apiUrl = "http://58.148.100.28:8080"
//const apiUrl = "http://localhost:8080"

/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const useFetch = async (url, params) => {
    try {
        const response = await axios.post(`${apiUrl}${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}