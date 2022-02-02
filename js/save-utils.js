export const query = (query) => document.querySelector(query);
export const queryAll = (query) => [...document.querySelectorAll(query)];
export const setRoot = (key,value) => document.documentElement.style.setProperty(key,value);



export const elementOptions = (element) => {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	const left = element.clientLeft;
	const right = left+width;
	const top = element.clientTop;
	const bottom = top+height;
	const x = left+width/2;
	const y = top+height/2;

	return{
		element,
		width,
		height,
		left,
		right,
		top,
		bottom,
		x,
		y
	}
}
export const clienRect = (element) => element.getBoundingClientReact();

export const distance = ($element1,$element2)=>{
	const { x:x1, y:y1 } = $element1;
	const { x:x2, y:y2 } = $element2;
	let [maxX,minX] = [x1,x2];
	let [maxY,minY] = [y1,y2];
	if( maxX < minX ) [maxX,minX] = [x2,x1];
	if( maxY < minY ) [maxY,minY] = [y2,y1];
	const x = maxX-minX;
	const y = maxY-minY;
	return Math.sqrt(x**2+y**2);
};

export const isFocus = (selectOption,refOption) => {
	const {x, y} = getPosDistance(selectOption,refOption);
	const maxHeight = Math.max(selectOption.height,refOption.height);
	const isX = selectOption.width/2 > x;
	const isY = maxHeight/2 > y;
	return isX && isY;
};

export const isFocusBottom = (selectOption,refOption) => {
	return  refOption.y < selectOption.y;
}

export const getPosDistance = function(selectOption,refOption){
	const x = Math.abs(selectOption.x-refOption.x);
	const y = Math.abs(selectOption.y-refOption.y);
	return {x, y};
};
