import useDrag from './store/drag.js';
import {
	setRoot,
	isClash,
	isClashMiddleY,
	isClashFocusTop,
	isClashFocusBottom,
	elementRect
} from './utils.js';



export const mouseMove = function(e){
	if( !useDrag.getters.isDown ) return;
	const {
		$items,
		$focusItem,
		clashIdx,
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
		62 , 72 / 2 = 36.5
		62+36.5 = 98.5 - 30 = 68.5
		clash 되면 transform 으로 focusHeight 만큼 내려가기 때문에 
		clash 된 상태에선 계산을 따로 해주어야 한다. ( offset 에서 transform 의 위치를 참고하진 않음 )


		@1. focusItem 에 bottom 이 clashItem 의 middleY 에 충돌하면 
		clashItem에 clash 클래스가 추가 된다.

		@2. focusItem 에 top 이 clashItem 의 middleY 에 충돌하면
		clashItem 의 앞에 있는 형제에 클래스가 추가된다.
	*/


	const notFocusItems = $items.filter( $item => $item !== $focusItem );
	const notFocusItemOptions = notFocusItems.map(elementRect);
	const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption,clashIdx > -1 && clashIdx < itemOption.idx ) );
	/*if( findClashItem ){
		console.log('true');
	}else{
		console.log('false');
	}*/
	if( findClashItem ) {
		const $findClashItem = findClashItem.element;
		console.log($findClashItem);
		let selectElement = $findClashItem;

		
		if( isClashFocusTop(focusMoveOption,findClashItem) ){
			selectElement = $findClashItem.previousElementSibling ?? $findClashItem;
		}
		if( isClashFocusBottom(focusMoveOption,findClashItem) ){
			selectElement = $findClashItem;
		}
		console.log(selectElement);

		if( clashIdx !== selectElement.dataset.idx ){
			$items.forEach( $item => $item.classList.remove('clash') );
		};

		selectElement.classList.add('clash');
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashIdx',selectElement.dataset.idx);
	}else{
		$items.forEach( $item => $item.classList.remove('clash') );
		setRoot('--focusHeight',`${focusOption.height}px`);
		useDrag.commit('setClashIdx',-1);
	}
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