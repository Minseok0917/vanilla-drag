import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import render from './render.js';
import {
	queryAll
} from './utils.js';
import {
	mouseMove,
	mouseUp,
	$itemContainerScroll,
	$itemMouseDown,
} from './event.js';





async function initial(){
	const { todos } = await fetch('todo.json').then( res => res.json() );
	useTodo.commit('setTodos',todos);

	window.addEventListener('mousemove',mouseMove); // drag, 충돌, 충돌 + 거리 비례 스크롤 감지
	window.addEventListener('mouseup',mouseUp);

	render();
}

initial();