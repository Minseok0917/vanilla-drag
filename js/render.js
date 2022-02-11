import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import { queryAll } from './utils/dom.js';
import { $itemMouseDown } from './event.js';



const $itemContainers = queryAll('.todo-container .item-container');
const [
	$todoContainer,
	$processContaienr,
	$closeContainer
] = $itemContainers;



const convertToElement = ({idx,name}) => (`
	<div class="item" data-idx="${idx}">
		<p class="title">${name}</p>
	</div>
`);
const lastElement = (idx) => (`<div class="item" data-idx="${idx}"></div>`);
const renderItem = () => {
	const {todos} = useTodo.getters;
	$itemContainers.forEach( $itemContainer => {
		const type = $itemContainer.dataset.type;
		const itemHTML = todos[type].map(convertToElement).join('');//+lastElement(todos[type].length);
		$itemContainer.innerHTML = itemHTML;
	});
}


const itemEvent = ($item) => {
	$item.addEventListener('mousedown',$itemMouseDown);
};
{ 
	const itemContainerEvent = ($itemContainer) => {
		// $itemContainer.addEventListener('')
	};
	$itemContainers.forEach(itemContainerEvent);
	useDrag.commit('setItemContainers',$itemContainers);
}


export default function(){
	renderItem();
	const $items = queryAll('.item-container .item');
	$items.forEach(itemEvent);

	useDrag.commit('setItems',$items);
}