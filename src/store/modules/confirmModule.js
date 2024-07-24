const state = () => ({
  isPopup : false ,
  title : "",
  message : "",
	callback : null,
	cancelCallback : null,
});

const getters = {
	getIsPopup: state => state.isPopup,
	getTitle: state => state.title,
	getMessage: state => state.message,
  	getCallback : state => state.callback,
	getCancelCallback : state => state.cancelCallback,
};

const actions = {
	open({ commit }, popupData) {  // 팝업을 열떄 팝업 정보셋팅
    commit('SET_TITLE' , "");
    commit('SET_MESSAGE' , "");

		commit('SET_IS_POPUP' , true);
		commit('SET_TITLE' , popupData.title || "정보");
		commit('SET_MESSAGE' , popupData.message || "");
		commit('SET_CALLBACK' , popupData.callback || null);
		commit('SET_CANCEL_CALLBACK' , popupData.cancelCallback || null);
	},
	close({ commit }) {  // 팝업을 닫을떄 팝업정보 초기화
		commit('SET_IS_POPUP' , false);
    // commit('SET_TITLE' , "");
    // commit('SET_MESSAGE' , "");
		commit('SET_CALLBACK' , null);
		commit('SET_CANCEL_CALLBACK' , null);
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
	SET_CANCEL_CALLBACK(state, payload) {
		state.cancelCallback = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
