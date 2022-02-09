import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import {
	elementRect,
	isClashContainer
} from './utils/drag.js';


export const globalMouseMove = function(event){
	if( !useDrag.getters.isDown ) return;
	const {
		$itemContainers,
		$items,
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

	const $selectContainer =  $itemContainers.find( $itemContainer => isClashContainer(focusMoveOption,$itemContainer) );
	if($selectContainer){
		$selectContainer.classList.add('select');
	}else{
		$itemContainers.forEach( $itemContainer => $itemContainer.classList.remove('select') );
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
	// const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption) );
}
export const globalMouseUp = function(){
	if( !useDrag.getters.isDown ) return;
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