import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import { setTodos } from './utils/todo.js';
import { setRoot } from './utils/dom.js';
import {
	elementRect,
	isClashContainer,
	isClash,

} from './utils/drag.js';

let ad = false;

export const globalMouseMove = function(event){
	if( !useDrag.getters.isDown ) return;
	const {
		$itemContainers,
		$items,
		$clashItem,
		$focusItem,
		focusOption
	} = useDrag.getters;

	const focusMoveX = event.clientX-focusOption.downX;
	const focusMoveY = event.clientY-focusOption.downY;
	const focusMoveOption = {
		...focusOption,
		middleX:focusOption.middleX + focusMoveX,
		middleY:focusOption.middleY + focusMoveY,
	};

	const $clashContainer =  $itemContainers.find( $itemContainer => isClashContainer(focusMoveOption,$itemContainer) );
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

	const notFocusItems = $items.filter( $item => $item !== $focusItem );
	const notFocusItemOptions = notFocusItems.map(elementRect);
	const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption, ($clashItem && +$clashItem.dataset.idx <= itemOption.idx ) ?? false  ) );

	if( ad  ) return;
	if( findClashItem ){
		const focusTop = focusMoveOption.middleY - focusMoveOption.height/2;
		const focusBottom = focusMoveOption.middleY + focusMoveOption.height/2;
		const findY = findClashItem.middleY;
		const t = Math.abs(focusTop - findY);
		const b = Math.abs(focusBottom - findY);
		let element = findClashItem.element;
		/*
		*/if( t > b && focusBottom > findY && t < 20 ) { // focusBottom Clash
			element = element.nextElementSibling;
		}
		// ad = true;
		// setTimeout(()=>  ad = false,130)

		$items.forEach( $item => $item.classList.remove('clash') );

		element.classList.add('clash');
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashItem',element);
	}else{
		$items.forEach( $item => $item.classList.remove('clash') );
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
}