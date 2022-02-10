import defineStore from '../plugin/store.js';

const defaultState = () => ({
	isDown:false,
	$itemContainers:[],
	$clashContainer:null,
	$items:[],
	$clashItem:null,
	$focusItem:null,
	focusOption:{},
});

const state = defaultState();

const getters = {
	isDown:(state)=>(state.isDown),
	$items:(state)=>(state.$items),
	$itemContainers:(state)=>(state.$itemContainers),
	$clashContainer:(state)=>(state.$clashContainer),
	$clashItem:(state)=>(state.$clashItem),
	$focusItem:(state)=>(state.$focusItem),
	focusOption:(state)=>(state.focusOption),
};
const mutations = {
	setIsDown:(state,payload)=>(state.isDown=payload),
	setItems:(state,payload)=>(state.$items=payload),
	setItemContainers:(state,payload)=>(state.$itemContainers=payload),
	setClashContainer:(state,payload)=>(state.$clashContainer=payload),
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