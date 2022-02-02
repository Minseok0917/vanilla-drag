import useDrag from './store/drag.js';
import {
	setRoot,
	elementRect
} from './utils.js';


export const mouseMove = function(e){
	if( !useDrag.getters.isDown ) return;
	const {
		$focusItem,
		focusOption,
	} = useDrag.getters;

	const focusMoveX = e.clientX-focusOption.downX;
	const focusMoveY = e.clientY-focusOption.downY;

	$focusItem.classList.add('focus');	
	Object.assign($focusItem.style,{
		position:'fixed',
		width:`${focusOption.width}px`,
		height:`${focusOption.height}px`,
		transform:`translate(${focusMoveX}px,${focusMoveY}px)`
	});
}

export const mouseUp = function(e){

}

export const $itemMouseDown = function(e){	
	useDrag.commit('setIsDown',true);
	useDrag.commit('setFocusItem',this);
	useDrag.commit('setFocusOption',{
		downX:e.clientX,
		downY:e.clientY,
		...elementRect(this)
	});
}

export const $itemContainerScroll = function(e){

}