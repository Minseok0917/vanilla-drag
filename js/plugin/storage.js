export function getStorage(key){
	return JSON.parse(localStorage.getItem(key));
}
export function setStorage(key,value){
	return localStorage.setItem(key,JSON.stringify(value));
}

export default {
	get:getStorage,
	set:setStorage,
}