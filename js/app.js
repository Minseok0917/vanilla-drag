import useDrag from './store/drag.js';
import {
	queryAll,
	elementOptions
} from './utils.js';
import {
	mouseMove,
	mouseUp,
	$itemMouseDown
} from './event.js';



const $items = queryAll('.item');
const $itemAddEvent = ($item) => {
	$item.addEventListener('mousedown',$itemMouseDown);
};
const $itemOption = ($item) => ({
	...elementOptions($item)
});

function initial(){
	window.addEventListener('mousemove',mouseMove);
	window.addEventListener('mouseup',mouseUp);
	$items.forEach($itemAddEvent);
	useDrag.commit('SET_ELEMENTS',$items.map($itemOption));
}

initial();


// document.documentElement.style.setProperty('--a','blue');
