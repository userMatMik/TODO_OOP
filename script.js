const form = document.forms.todos;
const input = form.elements.todo;
const todoListEl = document.querySelector('.todos-list');
const countEl = document.querySelector('.todos-count');
const clearAllBtn = document.querySelector('.todos-clear');

const arr = [{a: 1}, {b: 2}];

class ToDoList {
    todoList;
    constructor(todoList = []) {
        this.todoList = Object.freeze(todoList);
    }

    addTodo(todo) {
        const state = [...this.todoList, todo];
        this.todoList = Object.freeze(state);
        this.render();
        this.saveToStorage();
    }

    removeTodo(id) {
        const state = this.todoList.filter(item => item.id !== id);
        this.todoList = Object.freeze(state);
        this.render();
        this.saveToStorage();
    }

    removeAllCompleted() {
        const state = this.todoList.filter(item => item.isDone !== true )
        this.todoList = Object.freeze(state);
        this.render();
        this.saveToStorage();
    }

    updateTodo(id, updatedText) {
        const state = this.todoList.map(el => {
            if (el.id === id) {
                return {
                    ...el,
                    text: updatedText
                } 
            }
            return el
        })
        this.todoList = Object.freeze(state)
        this.render();
        this.saveToStorage();
    }

    updateStatus(id, isChecked) {
        const state = this.todoList.map(el => {
            if (el.id === id) {
                return {
                    ...el,
                    isDone: isChecked
                } 
            }
            return el
        })
        this.todoList = Object.freeze(state)
        this.render();
        this.saveToStorage();
    }

    get count() {
        const unCompleted = this.todoList.filter(el => el.isDone === false).length;
        return {
            uncompleted: unCompleted,
            completed: this.todoList.length - unCompleted,
        }
    }

    render() {
        countEl.innerText = this.count.uncompleted;
        todoListEl.innerHTML = "";
        this.todoList.forEach(todo => {
            todoListEl.insertAdjacentHTML(
                "beforeend",
                `
                <li data-id="${todo.id}"${todo.isDone ? ' class="todos-complete"':'""'}>
                    <input type="checkbox"${todo.isDone ? ' checked':''}>
                    <span>${todo.text}</span>
                    <button type="button"></button>
                </li>
                `
            )
        });

        if(this.count.completed > 0) {
            clearAllBtn.style.display = 'block';
        } else {
            clearAllBtn.style.display = 'none';
        }
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    loadFromStorage() {
        const storedTodos = localStorage.getItem('todos');
        this.todoList = Object.freeze(JSON.parse(storedTodos)) || [];
        this.render();
    }
}

class ToDo {
    id;
    text;
    date;
    isDone;
    constructor( text, isDone = false ) {
        this.id = this.dateData.timestamp;
        this.text = text;
        this.date = this.dateData.date;
        this.isDone = isDone;
    }

    get dateData() {
        const date = new Date();
        const d = date.getDate();
        const m = date.getMonth();
        const y = date.getFullYear();
        return {
            timestamp: date.getTime(),
            date: `${d}.${m === 0 ? '01' : `0${m}` }.${y}`,
        }
    }
}

const list = new ToDoList;

function deleteToDoEl(event) {
    if (event.target.nodeName.toLowerCase() !== 'button') {
        return
    }
    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);
    const label = event.target.previousElementSibling.innerText;
    if (window.confirm(`Delete ${label}`)) {
        list.removeTodo(id);
    }
}

function updateTodoEl(event) {
    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);
    const isChecked = event.target.checked;
    list.updateStatus(id, isChecked);
}

function addTodoEl(event) {
    event.preventDefault();
    const inputValue = input.value.trim();
    console.log(inputValue)
    const todo = new ToDo(inputValue);
    list.addTodo(todo);
    input.value = "";
}

function deleteCompleted() {
    if (window.confirm(`Delete ${ list.count.completed } completed todos?`)) {
        list.removeAllCompleted();
    }
}

function editToDoEl(event) {
    if (event.target.nodeName.toLowerCase() !== 'span') {
        return;
    }
    const id = parseInt(event.target.parentNode.getAttribute('data-id'), 10);
    const todoText = list.todoList.find( el => el.id === id).text;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = todoText;
    
    function handleEdit() {
        event.stopPropagation();
        const updatedText = input.value;
        if (updatedText !== todoText) {
            list.updateTodo(id, updatedText)
        }
    }

    event.target.style.display = 'none';
    event.target.parentNode.append(input);
    input.addEventListener('change', handleEdit)
    input.focus();
}

function init() {
    list.loadFromStorage();
    form.addEventListener( 'submit', addTodoEl );
    todoListEl.addEventListener( 'change', updateTodoEl );
    todoListEl.addEventListener( 'click', deleteToDoEl );
    clearAllBtn.addEventListener( 'click', deleteCompleted )
    todoListEl.addEventListener( 'dblclick', editToDoEl )
}

init();

console.log(list);