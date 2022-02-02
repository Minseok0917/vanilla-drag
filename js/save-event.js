import useDrag from './store/drag.js';
import {
	setRoot,
	isFocus,
	clienRect,
	isFocusBottom,
	elementOptions
} from './utils.js';

// min height / 2

export const mouseMove = function(e){
	const {
		isDown,
		elements,
		selectElement,
		selectDownPos
	} = useDrag.getters;
	if( !isDown ) return; // $item 에 MousDown 했는지 검사

	// selectElement 드래그 기능
	const selectMoveX = e.clientX-selectDownPos.x;
	const selectMoveY = e.clientY-selectDownPos.y;
	const $selectElement = selectElement.element;
	const selectMoveOption = {
		...selectElement,
		x:selectElement.x + selectMoveX,
		y:selectElement.y + selectMoveY,
	};

	$selectElement.classList.add('select');
	$selectElement.classList.remove('focus');
	Object.assign(selectElement.element.style,{
		position:'fixed',
		width:`${selectElement.width}px`,
		height:`${selectElement.height}px`,
		transform:`translate(${selectMoveX}px,${selectMoveY}px)`
	});


	// // selectElement 와 item 충돌 검사
	// const optionElements = elements.map( $item => ({
	// 	...elementOptions($item)
	// }))
	// const notSelectElements = optionElements.filter( ({element}) => element !== $selectElement );
	// const findFocusItem =  notSelectElements.find( (item) => isFocus(selectMoveOption,item) );
	// setRoot('--focusHeight',`0px`);
/*	notSelectElements.forEach( ({element}) => {
		element.removeAttribute('style');
		element.classList.remove('focus');
	} );
	if( findFocusItem ){
		setRoot('--focusHeight',`${selectElement.height}px`);
		if(isFocusBottom(selectMoveOption,findFocusItem)){
			findFocusItem.element.classList.add('focus');
		}else{
			findFocusItem.element.previousElementSibling.classList.add('focus');
		}
	}
*/
	/*
	drag scroll 안되고 최상위 1개 클릭시 그 밑에꺼 밖에 안됨 
	CLient , Offset 이런게 잘못된듯
	*/

}

export const mouseUp = function(e){
	/*useDrag.commit('SET_IS_DOWN',false);
	const { selectElement } = useDrag.getters;
	selectElement.style.transition = '0.5s';
	selectElement.classList.add('focus');
	setRoot('--focusHeight',`${selectElement.offsetHeight}px`);
	setRoot('--selectMoveX',`0px`);
	setRoot('--selectMoveY',`0px`);*/
}

export const $itemMouseDown = function(e){	

	useDrag.commit('SET_IS_DOWN',true);
	useDrag.commit('SET_SELECT_ELEMENT',elementOptions(this));
	useDrag.commit('SET_SELECT_DOWN_POS',{
		x:e.clientX,
		y:e.clientY
	});
}