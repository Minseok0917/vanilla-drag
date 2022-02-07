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


/*
const $itemContainer = queryAll('.item-container');
const $items = queryAll('.item-container .item');

const $itemContainerAddEvent = ($itemContainer) => {
	$itemContainer.addEventListener('scroll',$itemContainerScroll);
};
const $itemAddEvent = ($item) => {
	$item.addEventListener('mousedown',$itemMouseDown);
};
*/


async function initial(){
	const { todos } = await fetch('todo.json').then( res => res.json() );
	useTodo.commit('setTodos',todos);

	window.addEventListener('mousemove',mouseMove); // drag, 충돌, 충돌 + 거리 비례 스크롤 감지
	window.addEventListener('mouseup',mouseUp);

	render();
	/*
	$itemContainer.forEach($itemContainerAddEvent);
	$items.forEach($itemAddEvent);
	$items.forEach( ($item,idx) => $item.setAttribute('data-idx',idx) );
	useDrag.commit('setItems',$items);
*/

}

initial();


/*

parent auto scroll 

*/