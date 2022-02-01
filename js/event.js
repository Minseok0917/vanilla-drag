import useDrag from './store/drag.js';
import {
	setRoot,
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

	$selectElement.classList.add('select');
	Object.assign(selectElement.element.style,{
		position:'fixed',
		width:`${selectElement.width}px`,
		height:`${selectElement.height}px`,
		transform:`translate(${selectMoveX}px,${selectMoveY}px)`
	});

	// selectElement 와 item 충돌 검사
	const notSelectElements = elements.filter( ({element}) => element !== $selectElement );
	console.log(notSelectElements);

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