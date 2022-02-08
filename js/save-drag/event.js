import useDrag from './store/drag.js';
import useTodo from './store/todo.js';
import render from './render.js';
import {
	setRoot,
	isClash,
	isClashFocusTop,
	isClashFocusBottom,
	elementRect
} from './utils.js';

let animationIdx = -1;


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
		left:`${focusOption.left}px`,
		top:`${focusOption.top}px`,
		transform:`translate(${focusMoveX}px,${focusMoveY}px)`,
		zIndex:9999,
	});

	const notFocusItems = $items.filter( $item => $item !== $focusItem );
	const notFocusItemOptions = notFocusItems.map(elementRect);
	const findClashItem = notFocusItemOptions.find( itemOption => isClash(focusMoveOption,itemOption,clashIdx > -1 && clashIdx <= itemOption.idx ) );
	
	if( findClashItem ) {
		const $findClashItem = findClashItem.element;
		let selectElement = $findClashItem;

		if( isClashFocusTop(focusMoveOption,findClashItem) ){
			selectElement = $findClashItem;
		}else if( isClashFocusBottom(focusMoveOption,findClashItem) ){
			selectElement = $findClashItem.nextElementSibling ?? $findClashItem;
		}

		if( animationIdx === selectElement.dataset.idx ) return;
		if( clashIdx !== selectElement.dataset.idx ){
			$items.forEach( $item => $item.classList.remove('clash') );
		}
		animationIdx = selectElement.dataset.idx;
		setTimeout(()=> animationIdx = -1,50);


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
	if( !useDrag.getters.isDown ) return;
	const {
		$items,
		$focusItem,
		clashIdx,
	} = useDrag.getters;
	const { todos } = useTodo.getters;

	if( clashIdx > -1 ){
		const fidx = +$focusItem.dataset.idx; // 5
		const cidx = +clashIdx; // 0 
		const ftodo = todos.find( ({idx}) => idx === fidx );
		const ctodo = todos.find( ({idx}) => idx === cidx );

		if( ftodo.type !== ctodo.type ){
			ftodo.type = ctodo.type;
		}

		useTodo.commit('setTodos',todos.map( todo => {
			if( todo.idx === fidx ) todo.idx = cidx-1 < 0 ? 0 : cidx-1;
			else if( todo.idx <= fidx && todo.idx >= cidx  ) todo.idx +=1;
			else if( fidx < todo.idx && todo.idx < cidx ) todo.idx -=1;
			return todo;
		}).sort( (a,b) => a.idx-b.idx ));
		render();

		
	}

	useDrag.commit('setIsDown',false);
	useDrag.commit('setFocusItem',{});
	useDrag.commit('setFocusOption',{});
	useDrag.commit('setClashIdx',-1);

	$focusItem.classList.remove('focus');
	$focusItem.removeAttribute('style');
	$items.forEach( $item => $item.classList.remove('clash') );


}
//  처음시작시 이상함 + transiiton 도중 move 해서 이상함
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