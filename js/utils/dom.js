export const query = (query,parentElement=document) => parentElement.querySelector(query);
export const queryAll = (query,parentElement=document) => [...parentElement.querySelectorAll(query)];
export const setRoot = (key,value) => document.documentElement.style.setProperty(key,value);