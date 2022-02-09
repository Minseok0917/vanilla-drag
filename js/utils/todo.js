import useStorage from '../plugin/storage.js';
import useTodo from '../store/todo.js';
import render from '../render.js';

export const setTodos = function(todos){
	useStorage.set('todos',todos);
	useTodo.commit('setTodos',todos);
	render();
}
