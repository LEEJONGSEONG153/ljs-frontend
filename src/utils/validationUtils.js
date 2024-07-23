

/**
 * 이메일 유효성
 * @param {*} value 
 * @returns 
 */
export const emailValidation = (value) => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let result = emailRegex.test(value);
  return result;
}

/**
 * 전화번호 숫자만가능 9자~11자   (027661234 , 0317633189 , 01040543189)
 * @param {*} value 
 * @returns 
 */
export const phoneValidation = (value) => {

  const phoneRegex = /^\d{9,11}$/;
  let result = phoneRegex.test(value);
  return result;
}

/**
 * 8자리 이상으로 대문자,소문자,특수문자,숫자 중 2가지를 조합된 조건의 비밀번호 유효성 검증
 * @param {*} value 
 * @returns 
 */
export const pwdValidation = (value) => {
  const pwdRegex = /(?=.*[A-Z])(?=.*[a-z]).{8,}|(?=.*[A-Z])(?=.*[\W_]).{8,}|(?=.*[A-Z])(?=.*\d).{8,}|(?=.*[a-z])(?=.*[\W_]).{8,}|(?=.*\d)(?=.*[a-z]).{8,}|(?=.*[\W_])(?=.*\d).{8,}/
  const result = pwdRegex.test(value);
  return result 
}


/**
 * 메뉴 코드 유효성 검증
 * 6자리 알파벳 or 숫자
 * @param {*} value 
 */
export const menuCodeValidation = (value)  => {
  const regex = /^[a-zA-Z0-9]{1,6}$/;
  const result = regex.test(value)
  return result
}
