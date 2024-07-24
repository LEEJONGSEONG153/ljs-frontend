const state = () => ({
  isPopup : false ,
  title : "",
  message : "",
	callback : null,
});

const getters = {
	getIsPopup: state => state.isPopup,
	getTitle: state => state.title,
	getMessage: state => state.message,
  getCallback : state => state.callback,
};

const actions = {
	open({ commit }, popupData) {  // 팝업을 열떄 팝업 정보셋팅

		commit('SET_IS_POPUP' , true);
		commit('SET_TITLE' , popupData.title || "정보");
		commit('SET_MESSAGE' , popupData.message || "");
		commit('SET_CALLBACK' , popupData.callback || null);
	},
	close({ commit }) {  // 팝업을 닫을떄 팝업정보 초기화
		commit('SET_IS_POPUP' , false);
		// 여기서 변경하지말고 open할때 초기화하고시작하자  닫을때 애니매이션때문에 약간 껄끄러운 현상발생할수있음...
    // commit('SET_TITLE' , "");
    // commit('SET_MESSAGE' , "");
		commit('SET_CALLBACK' , null);
	},
	
};

const mutations = {
	SET_IS_POPUP(state, payload) {
		state.isPopup = payload;
	},
	SET_TITLE(state, payload) {
		state.title = payload;
	},
	SET_MESSAGE(state, payload) {
		state.message = payload;
	},
	SET_CALLBACK(state, payload) {
		state.callback = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
