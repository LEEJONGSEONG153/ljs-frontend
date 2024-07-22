<template>
  <div class="page login">
    <div class="container">
      <div class="landing-wrap"></div>

      <div class="login-wrap">
        <div class="login-area">
          <div class="flex-cc gap-8 mb-16">
            <h1>
              <img src="assets/img/logo-navy.png" alt="CRK" />
            </h1>
            <h4 class="f-bold">통합관제시스템</h4>
          </div>

          <div class="login-input-wrap">
            <div class="input-wrap">
              <el-input
                placeholder="아이디를 입력해주세요"
                v-model="loginId"
                clearable
                @keydown="handleEnter"
              ></el-input>
              <p class="error-msg">{{ errors.loginId }}</p>
            </div>
            <div class="input-wrap">
              <el-input
                v-model="loginPw"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                show-password
                @keydown="handleEnter"
              />
              <p class="error-msg">{{ errors.loginPw }}</p>
            </div>
            <div class="checkbox squere">
              <input type="checkbox" id="id-save" v-model="isSaveLoginId" />
              <label for="id-save">
                <span class="checkbox-icon"></span>
                <span class="label">아이디 저장</span>
              </label>
            </div>
          </div>
          <button type="button" @click="handleLogin" class="btn large filled">
            로그인
          </button>
          <div class="non-members">
              <p class="body-md f-bold">비회원<br/>AS서비스</p>
              <div class="btn-wrap">
                  <button type="button" class="btn medium outlined grey" @click="handleToggleAsReceptionPopup">접수</button>
                  <button type="button" class="btn medium outlined grey" @click="handleToggleAsProgCheckPopup">확인</button>
              </div>
          </div>

        </div>


      </div>
    </div>
  </div>
  <!-- v-if="isToggleAsReceptionPopup" -->
  <!-- <popup-as-reception-nonmemb v-if="isToggleAsReceptionPopup" @handleToggleAsReceptionPopup="handleToggleAsReceptionPopup"  />
  <popup-as-prog-check v-if="isToggleAsProgCheckPopup" @handleToggleAsProgCheckPopup="handleToggleAsProgCheckPopup" /> -->
</template>

<script setup>
import { ref } from 'vue';
import loginApi from '@/apis/loginApi';
import store from '@/store/store';
import router from '@/router/router';
import { useField, useForm } from 'vee-validate';


// import PopupAsProgCheck from '@/views/popup/PopupAsProgCheck';
// import PopupAsReceptionNonmemb from '@/views/popup/PopupAsReceptionNonmemb'
// import PopupAsReception from '@/views/popup/PopupAsReception'

// const isToggleAsReceptionPopup = ref(false)
// const isToggleAsProgCheckPopup = ref(false)

// /** 추후 벨리데이션 유효성검사 ValidationUtils.js 에 정리할예정 */
const validations = {
  loginId: (value) => {
    if (!value) {
      return '아이디를 입력해 주세요.';
    }
    return true;
  },
  loginPw: (value) => {
    if (!value) {
      return '비밀번호를 입력해 주세요.';
    }
    return true;
  },
};
const { errors, handleSubmit } = useForm({
  validationSchema: validations,
  validateOnChange: false,
});
const { value: loginId } = useField('loginId', undefined, {
  initialValue: store.getters['login/getSaveLoginId'],
});
const { value: loginPw } = useField('loginPw');
const isSaveLoginId = ref(store.getters['login/getIsSaveLoginId']);

/**
 * 로그인 버튼을 클릭했을때  벨리데이션 체크에 걸린다면 해당함수를 타지않는다.
 */
const handleLogin = handleSubmit(async (values) => {
  const loginInfo = { userId: loginId.value, loginPw: loginPw.value };

  // 로그인 api 호출
  const result = await loginApi.login(loginInfo);

  if (result) {
    const resultInfo = result.data;
    // 리스폰스 받은 토큰 , 사용자정보 , 메뉴정보 스토어에저장
    const loginData = {
    //   accessToken: resultInfo.tokenInfo.accessToken,
    //   refreshToken: resultInfo.tokenInfo.refreshToken,
      userInfo: resultInfo.userInfo,
      menuList: resultInfo.menuList,
    //   userName: resultInfo.userInfo.userName,
    //   email: resultInfo.userInfo.email,
    //   userAuth: resultInfo.userInfo.userAuth,
    //   awsAccessInfo: resultInfo.awsAccessInfo,
    //   id: resultInfo.userInfo.id,
    //   loginId: resultInfo.userInfo.loginId,
    //   phone: resultInfo.userInfo.phone,
    };

    // 로그인정보 저장
    await store.dispatch('login/setLoginData', loginData);

    // 아이디 저장 체크시 저장 체크안할시 아이디 기억 초기화
    // await store.dispatch('login/setSaveLoginId', {
    //   isSaveLoginId: isSaveLoginId.value,
    //   saveLoginId: loginId.value,
    // });

    // 메인화면으로이동
    router.push('/main');
  } else {
    // 벨리데이션 체크처럼 화면에 뿌리고싶음
  }
});

/**
 * 엔터키 입력 이벤트
 */
const handleEnter = (e) => {
  if (13 === e.keyCode) {
    handleLogin();
  }
};


// /**
//  * AS 접수 팝업 
//  */
// const handleToggleAsReceptionPopup = () => {
//   isToggleAsReceptionPopup.value = !isToggleAsReceptionPopup.value
// }

// /**
//  * AS 처리 확인 팝업
//  */
// const handleToggleAsProgCheckPopup = () => {
//   isToggleAsProgCheckPopup.value = !isToggleAsProgCheckPopup.value
// }

</script>
