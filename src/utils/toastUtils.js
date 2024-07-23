import { ElNotification } from 'element-plus'


/**
 * 2024.06.07 -saylee
 * 토스트 메시티 
 * @param {*} title 
 * @param {*} message 
 * @param {*} type 
 */
const alertMsg = (title , message , type ) => {
  setTimeout(() => {  // 조금이라도 지연안하면 여러개보낼경우 중첩으로보임. 그래서 0.01초지연
    ElNotification({
      title: title || "",
      message: message || "",
      type: type || "info",   // 타입 success , warning , info , error
    })
   }, 1);
}


export default alertMsg;