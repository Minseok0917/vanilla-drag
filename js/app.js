import useStorage from './plugin/storage.js';

/*
	localStorage 에 Todo 데이터가 없으면 
	todo.json 에서 데이터를 가져오고 가공 후 Localstorage 에 집어넣기로
*/

const storageName = 'todos';

async function init(){
	const todos = useStorage.get(storageName) ?? getJSON('./todo.json',function({todos}){
		const reduceInitValue = {
			todo:[],
			process:[],
			close:[]
		};
		todos.reduce((acc,todo)=>({
			...acc,
			[todo.type]: [...acc[todo.type],todo]
		}),reduceInitValue);
		useStorage.set(storageName,todos);
		return todos;
	});
}

async function getJSON(path,callback){
	return await fetch(path)
		.then( res => res.json() )
		.then(callback)
}

init();