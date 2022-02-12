import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import { setTodos } from './utils/todo.js';
import { setRoot } from './utils/dom.js';
import {
	elementRect,
	isClashContainer,
	isClash
} from './utils/drag.js';

let beforeY = null;
export const globalMouseMove = function(event){
	if( !useDrag.getters.isDown ) return;
	const {
		$itemContainers,
		$items,
		$focusItem,
		$clashItem,
		focusOption
	} = useDrag.getters;

	const isDown = beforeY < event.offsetY;
	beforeY = event.offsetY;
	const focusMoveX = event.clientX-focusOption.downX;
	const focusMoveY = event.clientY-focusOption.downY;
	const focusMoveOption = {
		...focusOption,
		middleX:focusOption.middleX + focusMoveX,
		middleY:focusOption.middleY + focusMoveY,
	};

	const $clashContainer =  $itemContainers.find( $itemContainer => isClashContainer(focusMoveOption,$itemContainer) );
	const clashContainerType = $clashContainer?.dataset.type;
	if($clashContainer){
		$clashContainer.classList.add('select');
		useDrag.commit('setClashContainer',$clashContainer);
	}else{
		$itemContainers.forEach( $itemContainer => $itemContainer.classList.remove('select') );
		useDrag.commit('setClashContainer',null);
	}

	$focusItem.classList.add('focus');	
	Object.assign($focusItem.style,{
		position:'fixed',
		width:`${focusOption.width}px`,
		height:`${focusOption.height}px`,
		left:`${focusOption.left}px`,
		top:`${focusOption.top}px`,
		transform:`translate(${focusMoveX}px,${focusMoveY}px)`,
		zIndex:9999,
	});

	const clashIdx = $clashItem?.dataset?.idx ?? false;
	const focusHeight = $focusItem.offsetHeight;
	const focusIdx = $focusItem.dataset.idx;
	const notFocusItems = $items.filter( $item => $item !== $focusItem );
	const notFocusItemOptions = notFocusItems.map(elementRect);
	const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption, $clashItem && clashIdx <= itemOption.idx  ) );
	if( findClashItem ){
		const focusTop = focusMoveOption.middleY - focusMoveOption.height/2;
		const focusBottom = focusMoveOption.middleY + focusMoveOption.height/2;
		const findY = findClashItem.middleY;
		let element = findClashItem.element;

		// console.log(findY);
		if( focusBottom > findY+10 && isDown === true   ){
			element = element.nextElementSibling;
			// console.log('bottom');
		}

		if( focusTop < findY-10 && isDown === false ){
			console.log('top');
		}
		// if( focusTodo )
		// console.log(t,b);
		// if( t > b && focusBottom > findY ) { // focusBottom Clash
		// 	element = element.nextElementSibling ?? element;
		// }

		$items.forEach( $item => $item.classList.remove('clash') );

		// console.log(findClashItem)
		element.classList.add('clash');
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashItem',element);
	}else{
		$items.forEach( $item => $item.classList.remove('clash') );
		setRoot('--focusHeight',`0px`);
		useDrag.commit('setClashItem',null);
	}
}
export const globalMouseUp = function(){
	if( !useDrag.getters.isDown ) return;
	const { todos } = useTodo.getters;
	const { 
		$clashContainer,
		$focusItem,
		$clashItem,
	} = useDrag.getters;


	if( $clashContainer !== null && $clashItem === null ){
		const clashType = $clashContainer.dataset.type;
		const $focusContainer = $focusItem.closest('.item-container');
		const focusIdx = +$focusItem.dataset.idx;
		const focusType = $focusContainer.dataset.type;
		const typeTodos = todos[focusType];

		const focusTodo = typeTodos.find( ({idx}) => idx === focusIdx );
		const exceptFocusTodo = typeTodos.filter( ({idx}) => idx !== focusIdx ).map( ({idx,...value}) => {
			if( focusIdx < idx ){
				idx--;
			}
			return { idx, ...value };
		});

		const clashTodos = todos[clashType];
		if(  clashTodos.length === 0 ){
			focusTodo.idx = 0;
		}else{
			focusTodo.idx = clashTodos.length;
		}

		todos[focusType] = exceptFocusTodo;
		todos[clashType] = [...todos[clashType],focusTodo];

		useDrag.commit('setIsDown',false);
		useDrag.commit('setClashContainer',null);
		useDrag.commit('setClashItem',null);
		useDrag.commit('setFocusItem',null);
		setTodos(todos);
	}
}
export const $itemMouseDown = function(event){
	useDrag.commit('setIsDown',true);
	useDrag.commit('setFocusItem',this);
	useDrag.commit('setFocusOption',{
		downX:event.clientX,
		downY:event.clientY,
		...elementRect(this)
	});
	beforeY = event.offsetY;
}