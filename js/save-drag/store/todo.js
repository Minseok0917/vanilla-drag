import defineStore from '../plugin/store.js';

const defaultState = () => ({
	todos:[]
});

const state = defaultState();

const getters = {
	todos:(state)=>(state.todos)
};
const mutations = {
	setTodos:(state,payload)=>(state.todos = payload)
};
const actions = {

};


export default defineStore({
	state,
	getters,
	mutations,
	actions
});