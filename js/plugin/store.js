export default function defineStore(options={}){
	const defaultOptions = {
		state:{},
		getters:{},
		mutations:{},
		actions:{},
		...options
	};
	const storage = {
		getters:{},
		commit(){},
		dispatch(){}
	};

	function init(){
		const {defineProperty, keys} = Object;
		const {getters, mutations, actions} = defaultOptions;
		keys(getters).forEach( key => storage.getters[key] = getters[key](defaultOptions.state));
		storage.commit = function(key,payload){
			mutations[key](defaultOptions.state,payload);
			keys(getters).forEach( key => storage.getters[key] = getters[key](defaultOptions.state));
		};
		storage.dispatch = async function(key,payload){
			const data = await actions[key]({
				state:defaultOptions.state,
				getters:storage.getters,
				commit:storage.commit,
				dispatch:storage.dispatch
			},payload);
			keys(getters).forEach( key => storage.getters[key] = getters[key](defaultOptions.state));
			return data;
		}
	}
	init();
	return storage;
};