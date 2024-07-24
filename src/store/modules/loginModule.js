const state = () => ({
	//accessToken: null,      // access 토큰
	//refreshToken: null,     // refresh 토큰
	userInfo : null,        // 사용자정보
	menuList : null,        // 메뉴리스트
	//isSaveLoginId : false,  // 아이디 저장여부
    //saveloginId : "",       // 아이디 저장여부 true일떄 저장할 Id 
	//userName  : "",         // 사용자명
	//email : "",             // 이메일
	//userAuth : "",          // 사용자권한코드
	//awsAccessInfo : null,   // aws 접근정보
	//id : "",
	//loginId : "",
	//phone: ""
});

const getters = {
	//getAccessToken: state => state.accessToken,
	//getRefreshToken: state => state.refreshToken,
	getUserInfo: state => state.userInfo,
	getMenuList: state => state.menuList,
	//getIsSaveLoginId : state => state.isSaveLoginId,
	//getSaveLoginId : state => state.saveloginId,
	//getUserName : state => state.userName ,
	//getEmail : state => state.email,
	//getUserAuth : state => state.userAuth,
	//getAwsAccessInfo : state => state.awsAccessInfo,
	//getId : state => state.id,
	//getLoginId : state => state.loginId,
	//getPhone: state => state.phone,
};

const actions = {
	// 로그인 정보저장
	setLoginData({ commit }, loginData) {
		//commit('SET_ACCESS_TOKEN' , loginData.accessToken);
		//commit('SET_REFRESH_TOKEN' , loginData.refreshToken);
		commit('SET_USER_INFO' , loginData.userInfo);
		commit('SET_MENU_LIST' , loginData.menuList);
		//commit('SET_USER_NAME' , loginData.userName);
		//commit('SET_EMAIL' , loginData.email);
		//commit('SET_USER_AUTH' , loginData.userAuth);
		//commit('SET_AWS_ACCESS_INFO' , loginData.awsAccessInfo);
		//commit('SET_ID' , loginData.id);
		//commit('SET_LOGIN_ID' , loginData.loginId);
		//commit('SET_PHONE', loginData.phone);
	},
	// 로그아웃 시 정보 초기화
	setLogoutData({ commit }) {
		//commit('SET_ACCESS_TOKEN' , null);
		//commit('SET_REFRESH_TOKEN' , null);
		commit('SET_USER_INFO' , null);
		commit('SET_MENU_LIST' , null);
		//commit('SET_USER_NAME' , "");
		//commit('SET_EMAIL' , "");
		//commit('SET_USER_AUTH' , "");
		//commit('SET_AWS_ACCESS_INFO' , null);
		//commit('SET_ID' , "");
		//commit('SET_LOGIN_ID' , "");
		//commit('SET_PHONE', "");
	},
	// 아이디정보 기억하기
	// setSaveLoginId({ commit }, loginData) {
	// 	commit('SET_IS_SAVE_LOGIN_ID' , loginData.isSaveLoginId || false);
	// 	if(loginData.isSaveLoginId){
	// 		commit('SET_SAVE_LOGIN_ID' , loginData.saveLoginId || "");
	// 	}else{
	// 		commit('SET_SAVE_LOGIN_ID' , "");
	// 	}
	// }
};

const mutations = {
	// SET_ACCESS_TOKEN(state, payload) {
	// 	state.accessToken = payload;
	// },
	// SET_REFRESH_TOKEN(state, payload) {
	// 	state.refreshToken = payload;
	// },
	SET_USER_INFO(state, payload) {
		state.userInfo = payload;
	},
	SET_MENU_LIST(state, payload) {
		state.menuList = payload;
	},
	// SET_USER_NAME(state, payload) {
	// 	state.userName = payload;
	// },
	// SET_EMAIL(state, payload) {
	// 	state.email = payload;
	// },
	// SET_USER_AUTH(state, payload) {
	// 	state.userAuth = payload;
	// },
	// SET_AWS_ACCESS_INFO(state, payload) {
	// 	state.awsAccessInfo = payload;
	// },
	// SET_IS_SAVE_LOGIN_ID(state, payload) {
	// 	state.isSaveLoginId = payload;
	// },
	// SET_SAVE_LOGIN_ID(state, payload) {
	// 	state.saveloginId = payload;
	// },
	// SET_ID(state, payload) {
	// 	state.id = payload;
	// },
	// SET_LOGIN_ID(state, payload) {
	// 	state.loginId = payload;
	// },
	// SET_PHONE(state, payload) {
	// 	state.phone = payload
	// }
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
