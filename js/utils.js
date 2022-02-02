export const query = (query) => document.querySelector(query);
export const queryAll = (query) => [...document.querySelectorAll(query)];
export const setRoot = (key,value) => document.documentElement.style.setProperty(key,value);



export const elementRect = (element) => {
	const {left, top, width, height} = element.getBoundingClientRect();
	const middleX = left + width/2;
	const middleY = top + height/2;
	return {
		element,
		left,
		top,
		width,
		height,
		middleX,
		middleY
	}
};

export const isClash = (focusOption,refOption) => {
	const {x, y} = getPosDistance(focusOption,refOption);
	const isX = focusOption.width/2 > x;
	const isY = refOption.height/2+focusOption.height/2 > y;
	return isX && isY;	
};
export const isClashTop = (focusOption,refOption) => {
	const focusBottom = focusOption.middleY+focusOption.height/2;
	return focusBottom < refOption.middleY;
};

export const getPosDistance = function(focusOption,refOption){
	const x = Math.abs(focusOption.middleX-refOption.middleX);
	const y = Math.abs(focusOption.middleY-refOption.middleY);
	return {x, y};
};




