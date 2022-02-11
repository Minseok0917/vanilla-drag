export const elementRect = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	const middleX = left + width/2;
	const middleY = top + height/2;
	const idx = +element.dataset.idx;
	return {
		element,
		idx,
		left,
		top,
		width,
		height,
		middleX,
		middleY
	}
};


export const isClash = (focusOption,refOption,isClash) => {
	console.log(isClash);
	const {x, y} = getPosDistance(focusOption,refOption);
	const isX = focusOption.width/2 > x;
	const isY = refOption.height/2+( isClash ? focusOption.height : 0 ) > y;
	return isX && isY;	
};


export const isClashFocusTop = (focusOption,refOption) => {
	const focusTop = focusOption.middleY-focusOption.height/2;
	return focusTop < refOption.middleY &&  refOption.middleY-focusTop < 5 ;
};
export const isClashFocusBottom = (focusOption,refOption)=>{
	const focusBottom = focusOption.middleY+focusOption.height/2;
	return focusBottom > refOption.middleY;
}

export const getPosDistance = function(focusOption,refOption){
	const x = Math.abs(focusOption.middleX-refOption.middleX);
	const y = Math.abs(focusOption.middleY-refOption.middleY);
	return {x, y};
};

export const isClashContainer = function(focusOption,$itemContainer){
	const containerOptions = elementRect($itemContainer);
	const type = $itemContainer.dataset.type;

	const {x,y} = getPosDistance(focusOption,containerOptions)
	const isX = focusOption.width/2 > x;
	const isY = containerOptions.height/2 > y;

	return isX && isY;
}



