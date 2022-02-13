import useStorage from '../plugin/storage.js';
import useTodo from '../store/todo.js';
import render from '../render.js';

const todoSort = (a,b) => a.idx - b.idx;

export const setTodos = function(todos){
	todos.todo = todos.todo.sort(todoSort)
	todos.process = todos.process.sort(todoSort)
	todos.close = todos.close.sort(todoSort)

	useStorage.set('todos',todos);
	useTodo.commit('setTodos',todos);
	render();
}
