import { useGet, useFetch, useDelete, usePut } from '@/utils/apiUtils';
import axios from 'axios';
// import store from '@/store/store';
/**
 * 2024.05.08 - Saylee
 * 로그인 
 */
const loginApi = {
  
  /**
   * 로그인  API  API 파일에서는 호출만을 담당하고  변수 state 상태를 업데이트하는것은 컴포넌트 내에서 수정하는게 바람직함.
   * @param {*} loginInfo 
   * @returns 
   */
  login : async (param) => {
    return await useFetch('/api/v1/login',param)
  },
  login2 : async (param) => {
    return await useFetch('/api/v1/oauth/login', param)
  },

  refreshToken : async (param) => {
    return await useFetch('/api/v1/oauth/refresh-token', param)
  },

  sampleTest : async () => {
    return await useFetch('/api/v1/common-code/getList', { mainCode : "A001"})
  }
}


export default loginApi