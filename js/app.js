import useStorage from './plugin/storage.js';
import getTodo from './api/getTodo.js';
import { setTodos } from './utils/todo.js';
import {
	globalMouseMove,
	globalMouseUp
} from './event.js';


function event(){
	window.addEventListener('mousemove',globalMouseMove);
	window.addEventListener('mouseup',globalMouseUp);
}
async function init(){
	const todos = useStorage.get('todos') ?? await getTodo();
	setTodos(todos);
	event();
}

init();