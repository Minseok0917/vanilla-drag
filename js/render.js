import useTodo from './store/todo.js';
import useDrag from './store/drag.js';
import { queryAll } from './utils.js';
import {
	$itemMouseDown 
} from './event.js';

const $itemContainers = queryAll('.item-container');
const [$todoContainer,$processContainer,$closeContainer] = $itemContainers;



const todoElement = ({idx,name}) => `
	<div class="item" data-idx="${idx}">
		<p class="title">${name}</p>
	</div>
`;

const lastElement = `<div class="item"></div>`;


export default function(){
	const { todos } = useTodo.getters;
	const todoType = todos.reduce( (acc,todo) => ({
		...acc,
		[todo.type]: [...acc[todo.type],todo]
	}),{
		todo:[],
		process:[],
		close:[],
	});
	$todoContainer.innerHTML = todoType.todo.map(todoElement).join('')+lastElement;
	$processContainer.innerHTML = todoType.process.map(todoElement).join('')+lastElement;
	$closeContainer.innerHTML = todoType.close.map(todoElement).join('')+lastElement;

	const $items = queryAll('.item');
	$items.forEach( $item => $item.addEventListener('mousedown',$itemMouseDown ) );

	useDrag.commit('setItems',$items);
}