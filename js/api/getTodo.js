export default async function(){
	return await fetch('./todo.json')
		.then( response => response.json() )
		.then( ({todos}) => {
			const initValue = {
				todo:[],
				process:[],
				close:[]
			};
			const todoType = todos.reduce((acc,todo)=>({
				...acc,
				[todo.type]:[...acc[todo.type],todo]
			}),initValue);
			// type todos  에 순서대로 idx 적용
			return Object.fromEntries(Object.entries(todoType).map( ([type,todos]) => 
				[type,todos.map( (todo,idx) => ({
					...todo,
					idx
				}))]
			));
		});
}