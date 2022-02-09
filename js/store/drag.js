import defineStore from '../plugin/store.js';

const defaultState = () => ({
	isDown:false,
	$itemContainer:[],
	$items:[],
	$focusItem:{},
	focusOption:{},
	clashIdx:-1,
});

const state = defaultState();

const getters = {
	isDown:(state)=>(state.isDown),
	$items:(state)=>(state.$items),
	$itemContainers:(state)=>(state.$itemContainers),
	$focusItem:(state)=>(state.$focusItem),
	focusOption:(state)=>(state.focusOption),
	clashIdx:(state)=>(state.clashIdx),
};
const mutations = {
	setIsDown:(state,payload)=>(state.isDown=payload),
	setItems:(state,payload)=>(state.$items=payload),
	setItemContainers:(state,payload)=>(state.$itemContainers=payload),
	setFocusItem:(state,payload)=>(state.$focusItem=payload),
	setFocusOption:(state,payload)=>(state.focusOption=payload),
	setClashIdx:(state,paylaod)=>(state.clashIdx=paylaod)
};
const actions = {

};


export default defineStore({
	state,
	getters,
	mutations,
	actions
});