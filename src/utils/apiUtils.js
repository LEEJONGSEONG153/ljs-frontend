import axios from 'axios';

const apiUrl = process.env.VUE_APP_BACKEND_HOST

/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const useGet = async (url, params) => {
    try {
        //모바일에서 로컬pc 접속했을때 자꾸 cors떠서 proxy 처리 해놓음
        //const response = await axios.post(`${apiUrl}${url}`, params)
        const response = await axios.get(`${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const useFetch = async (url, params) => {
    try {
        //모바일에서 로컬pc 접속했을때 자꾸 cors떠서 proxy 처리 해놓음
        //const response = await axios.post(`${apiUrl}${url}`, params)
        const response = await axios.post(`${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const useDelete = async (url, params) => {
    try {
        //모바일에서 로컬pc 접속했을때 자꾸 cors떠서 proxy 처리 해놓음
        //const response = await axios.post(`${apiUrl}${url}`, params)
        const response = await axios.delete(`${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
/**
 * back-end API 호출
 * @param {*} url 
 * @param {*} params 
 */
export const usePut = async (url, params) => {
    try {
        //모바일에서 로컬pc 접속했을때 자꾸 cors떠서 proxy 처리 해놓음
        //const response = await axios.post(`${apiUrl}${url}`, params)
        const response = await axios.put(`${url}`, params)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}