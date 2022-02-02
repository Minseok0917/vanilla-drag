import useDrag from './store/drag.js';
import {
	queryAll 
} from './utils.js';
import {
	mouseMove,
	mouseUp,
	$itemContainerScroll,
	$itemMouseDown,
} from './event.js';


const $itemContainer = queryAll('.item-container');
const $items = queryAll('.item-container .item');

const $itemContainerAddEvent = ($itemContainer) => {
	$itemContainer.addEventListener('scroll',$itemContainerScroll);
};
const $itemAddEvent = ($item) => {
	$item.addEventListener('mousedown',$itemMouseDown);
};

function initial(){
	window.addEventListener('mousemove',mouseMove); // drag, 충돌, 충돌 + 거리 비례 스크롤 감지
	window.addEventListener('mouseup',mouseUp);
	$itemContainer.forEach($itemContainerAddEvent);
	$items.forEach($itemAddEvent);
	
	useDrag.commit('setItems',$items);
}

initial();


/*

parent auto scroll 

*/