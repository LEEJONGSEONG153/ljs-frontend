import { useGet, usePost, useDelete, usePut } from '@/utils/apiUtils';
import axios from 'axios';

/**
 * 2024.05.31 - Saylee
 * 사용자정보 (사용자관리) 
 */
const userApi = {
  
  /**
   * 사이트 메뉴 조회
   * @param {*} param 
   * @returns 
   */
  getMenuList : async (param) => {
    return await usePost('/api/v1/site-menu/getList', param)
  },

  /**
   * 사이트 메뉴 추가/수정
   * @param {*} param 
   * @returns 
   */
  updateMenu : async (param) => {
    return await usePost('/api/v1/site-menu/saveList', param)
  },

  /**
   * 사이트 메뉴 삭제
   * @param {*} param 
   * @returns 
   */
  deleteMenu : async (param) => {
    return await usePost('/api/v1/site-menu/deleteList', param)
  }

}


export default userApi