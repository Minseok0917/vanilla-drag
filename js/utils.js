export const query = (query) => document.querySelector(query);
export const queryAll = (query) => [...document.querySelectorAll(query)];
export const setRoot = (key,value) => document.documentElement.style.setProperty(key,value);



export const elementRect = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	const middleX = left + width/2;
	const middleY = top + height/2;
	const idx = element.dataset.idx;
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
	const {x, y} = getPosDistance(focusOption,refOption);
	console.log(refOption.element, isClash)
	const isX = focusOption.width/2 > x;
	const isY = refOption.height/2+focusOption.height/2+(isClash ? focusOption.height : 0 ) > y;
	return isX && isY;	
};
export const isClashMiddleY = (focusOption,refOption) => {
	const focusTop = focusOption.middleY-focusOption.height/2;
	const focusBottom = focusOption.middleY+focusOption.height/2;

	const top = Math.abs(refOption.middleY-focusTop);
	const bottom = Math.abs(refOption.middleY-focusBottom);

	// console.log(top,bottom);

	return false;
	// console.log(top,bottom);
	// return ( top < 5 ) || ( bottom < 5);
};


export const isClashFocusTop = (focusOption,refOption) => {
	const focusTop = focusOption.middleY-focusOption.height/2;
	return focusTop < refOption.middleY;
};
export const isClashFocusBottom = (focusOption,refOption)=>{
	const focusBottom = focusOption.middleY+focusOption.height/2;
	return focusBottom > refOption.middleY && focusBottom-refOption.middleY < 5;
}

export const getPosDistance = function(focusOption,refOption){
	const x = Math.abs(focusOption.middleX-refOption.middleX);
	const y = Math.abs(focusOption.middleY-refOption.middleY);
	return {x, y};
};




