export const query = (query) => document.querySelector(query);
export const queryAll = (query) => [...document.querySelectorAll(query)];
export const setRoot = (key,value) => document.documentElement.style.setProperty(key,value);



export const elementOptions = (element) => {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	const left = element.offsetLeft;
	const right = left+width;
	const top = element.offsetHeight;
	const bottom = top+height;

	return{
		width,
		height,
		left,
		right,
		top,
		bottom,
		element
	}
}
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

/*
const isFocus = function(selectOption,refOptions){
	const isX = refOptions.width/2 > Math.abs(refOptions.x-selectOption.x);
	const isY = refOptions.height/2 > Math.abs(refOptions.y-selectOption.y);
	return isX && isY;	
};
const getPosDistance = function(selectOption,refOptions){
	const x = Math.abs(refOptions.x-selectOption.x);
	const y = Math.abs(refOptions.y-selectOption.y);
	return {x, y};
};
*/