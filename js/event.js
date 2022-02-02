import useDrag from './store/drag.js';
import {
	setRoot,
	isClash,
	isClashTop,
	elementRect
} from './utils.js';



export const mouseMove = function(e){
	if( !useDrag.getters.isDown ) return;
	const {
		$items,
		$focusItem,
		$clashItem,
		focusOption,
	} = useDrag.getters;


	const focusMoveX = e.clientX-focusOption.downX;
	const focusMoveY = e.clientY-focusOption.downY;
	const focusMoveOption = {
		...focusOption,
		middleX:focusOption.middleX + focusMoveX,
		middleY:focusOption.middleY + focusMoveY,
	};

	$focusItem.classList.add('focus');	
	Object.assign($focusItem.style,{
		position:'fixed',
		width:`${focusOption.width}px`,
		height:`${focusOption.height}px`,
		transform:`translate(${focusMoveX}px,${focusMoveY}px)`
	});
	/*
		clash 되면 transform 으로 focusHeight 만큼 내려가기 때문에 
		clash 된 상태에선 계산을 따로 해주어야 한다. ( offset 에서 transform 의 위치를 참고하진 않음 )
	*/


	const notFocusItems = $items.filter( $item => $item !== $focusItem );
	const notFocusItemOptions = notFocusItems.map(elementRect);
	const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption) )
	if( findClashItem ){
		const $clashItem = findClashItem.element;
		findClashItem.middleY += focusOption.height;

		let selectElement = $clashItem;
		if( isClashTop(focusMoveOption,findClashItem) ){
			// console.log('top');
			selectElement = $clashItem.previousElementSibling;
		}

		/*if( $clashItem !== selectElement  ){
			$items.forEach( $item => $item.classList.remove('clash') );
			// setRoot('--focusHeight',`0px`);
		}*/
		selectElement.classList.add('clash');
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashItem',selectElement);
	}else{
		$items.forEach( $item => $item.classList.remove('clash') );
		setRoot('--focusHeight',`0px`);
	}
	/*
	충돌 공식
		focusItem.width/2 < x 들어가야됨
		maxHeight/2 


		middleY 는 focusItem.top 이 닿으면 아래로 내려간다.
		middleY 는 focusItem.bottom 이 닿으면 위로 올라간다.
	*/

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