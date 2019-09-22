import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
	privilege:'',
	user:[]
};
 
const getters = {
	getPrivilege(state){
		return state.privilege;
	},
	getUser(state){
		return state.user;
	}
};

const mutations = {
	setPrivilege(state, privilege){
		state.privilege = privilege;		
	},
	setUser(state, user){
		state.user = user;
		state.privilege = user.privilege.name;
	},
	setNull(state){
		state.privilege = "";
		state.user = "";
	}
};

const actions = {
	login(context, privilege, user){
		context.commit("setPrivilege",privilege);
		context.commit("setUser", user);
	},
	logout(context){
		context.commit("setNull");
	}
	
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions   
});

export default store;	