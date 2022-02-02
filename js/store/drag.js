import defineStore from '../plugin/store.js';

const defaultState = () => ({
	isDown:false,
	$items:[],
	$focusItem:{},
	focusOption:{},
	$clashItem:{},
});

const state = defaultState();

const getters = {
	isDown:(state)=>(state.isDown),
	$items:(state)=>(state.$items),
	$focusItem:(state)=>(state.$focusItem),
	focusOption:(state)=>(state.focusOption),
	$clashItem:(state)=>(state.$clashItem),
};
const mutations = {
	setIsDown:(state,payload)=>(state.isDown=payload),
	setItems:(state,payload)=>(state.$items=payload),
	setFocusItem:(state,payload)=>(state.$focusItem=payload),
	setFocusOption:(state,payload)=>(state.focusOption=payload),
	setClashItem:(state,paylaod)=>(state.$clashItem=paylaod)
};
const actions = {

};


export default defineStore({
	state,
	getters,
	mutations,
	actions
});