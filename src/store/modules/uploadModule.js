const state = () => ({
    //매장제품리스트 사이드 팝업
    countStandard: 3,
})

const getters = {
    getCountStandard: state => state.countStandard,
}


const actions = {
    
    setCountStandard({ commit }, countStandard) {
        commit('ADD_COUNT_STANDARD', countStandard)
    },
}


const mutations = { 
    ADD_COUNT_STANDARD(state, payload){
        state.countStandard += payload
    },
}


export default {
    namespaced: true,
	state,
	getters,
	actions,
	mutations,
}


