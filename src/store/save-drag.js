import defineStore from '../plugin/store.js';

const defaultState = () => ({
	$items:[],
	select:{
		$item:'',
		pos:{},
	},
	isDown:false,
	selectItem:'',
	selectPos:{}
});

const state = defaultState();

const getters = {
	items:(state)=>(state.items),
	isDown:(state)=>(state.isDown),
	selectElement:(state)=>(state.selectElement),
	selectDownPos:(state)=>(state.selectDownPos),
};
const mutations = {
	SET_ELEMENTS:(state,payload)=>(state.elements = payload),
	SET_SELECT_ELEMENT:(state,payload)=>(state.selectElement = payload),
	SET_SELECT_DOWN_POS:(state,payload)=>(state.selectDownPos = payload),
	SET_IS_DOWN:(state,payload)=>(state.isDown = payload),
};
const actions = {

};


export default defineStore({
	state,
	getters,
	mutations,
	actions
});