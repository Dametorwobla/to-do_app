const html = documentElement;
html.dataset.theme = `theme-light`;

const themeBtn = document.querySelector('.theme-btn');
const wrapper = document.querySelector('.wrapper');
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.querySelector('.add-todo'); 
const todoUl = wrapper.querySelector('.todos');
const actions = wrapper.querySelector('.actions');
const clearCompletedBtn = actions.querySelector('.actions');
const filterBox = wrapper.querySelector('.filters');



//Even handler functions

//creating empty container
function emptyGenerator() {
    const empty =  document.createElement('div');
    empty.className = "empty-container";
    empty.textContent = "No todo items left!";
    return empty;
}

//themes toggler
function toggleTheme() {
    const themeIcon = themeBtn.querySelector('img');

    if(themeBtn.classList.contains('light')) {
       themeBtn.classList.remove('light');
       themeBtn.classList.add('dark');
       html.dataset.theme = 'theme-dark';
       themeIcon.src = './images/icon-sun.svg';
       themeIcon.alt = 'moon svg'; 
    } else {
        themeBtn.classList.remove('dark');
        themeBtn.classList.add('light');
        html.dataset.theme = 'theme-light';
        themeIcon.src = './images/icon-moon.svg';
        themeIcon.alt = 'sun svg';
    }

}

//changing the UI while resizing the window
function changeUI() {
    if (window.innerWidth > 1200){
        actions.insertBefore(filterBox, clearCompletedBtn);
        filterBox.classList.add('clea-margin')
    } else {
        wrapper.insertBefore(filterBox, document.querySelector('.drag-help-info'));
        filterBox.classList.remove('clear-margin');
    }
}

//checking for empty todo container
function toggleEmptyContainer() {
    switch (todoInput.childElementCount) {
        case 0:
            todoInput.append(emptyGenerator());
            break;
        default:
            if (todoUl.querySelector('.empty-container')) {
                todoUl.querySelector('.empty-container').remove();
            };
            break;
    }
}

//generating todo item template
function todoGenerator(text) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.draggable = true;
    todoItem.innerHTML =   `
                        <label class="check-label">
                            <input type="checkbox">
                            <span class="check-round"></span>
                        </label>
                        <li class="todo">${text}</li>
                        <button class=btn delete"><img src="./images/icon-cross.svg" alt="cross svg"></button>
    `;

    const label = todoItem.querySelector('label');
    const li = todoItem.querySelector('li');
    const button = todoItem.querySelector('button');

    retun [todoItem, label, li, button];
}

//counting active todos
function activeTodoCount() {
    const count = actions.querySelector('#count');
    const wholeCount = todoUl.querySelectorAll('.todo-item').length;
    const inactiveCount = todoUl.querySelectorAll('.todo-item.strike').length;
    const activeCount = wholeCount - inactiveCount;
    count.textContent = activeCount;
}

//Adding todo
function addTodo(e){
    e.preventDefault();
    //getting input text
    const text = todoInput.value;
    if (text === '') return;
    const [todoItem, checkLabel, todoLi, deleteBtn] = todoGenerator(text);

    //adding todo
    todoUl.append(todoItem);
    toggleEmptyContainer();
    activeTodoCount()

    //clearing the input
    todoInput.value = '';

    //event delegation is used here.
    todoItem.addEventListener('click', e => {
        if (e.target === checkLabel || checkLabel.querySelector('span') || checkLabel.querySelector('input')) {
            if (checkLabel.querySelector('input').checked) {
                todoItem.classList.add('strike');
                activeTodoCount();
            } else {
                todoItem.classList.remove('strike');
                activeTodoCount();
            }
        }
        /*Here "e.currentTarget" and "this" refers to the addTodoBtn.
        It's because I am adding eventlistener to the todoItem
        which is generated inside of the addTodoBtn's event handler
        That's why i'm using e.target.closest('div.todo-item') to get the result without a bug.
        console.log(e.target)*/

        if (e.target === todoLi) {
            if(e.target.closest('div.todo-item').classList.contains('strike')) {
                e.target.closest('div.todo-item').classList.remove('strike');
                checkLabel.querySelector('input').checked = false;
                activeTodoCount();
            } else {
                e.target.closest('div.todo-item').classList.add('strike');
                checkLabel.querySelector('input').checked = true;
                activeTodoCount();
            }
        }

        if(e.target === deleteBtn || e.target === deleteBtn.querySelector('img')) {
           e.target.closest('div.todo-item').classList.add('slide');
           e.target.closest('div.todo-item').addEventListener('animationend', removeTodo.bind(this, todoItem));
        }
    });

    todoItem.addEventListener('dragstart', e => {
        console.log('dragstart');
        todoItem.classList.add('ondrag');
    });

    todoItem.addEventListener('dragend', e => {
        console.log('dragend');
        todoItem.classList.remove('ondrag');
    });

    todoUl.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoUl, e.clientry)
        const draggable = document.querySelector('.ondrag')
        if (afterElement == null) {
            todoUl.appendChild(draggable)
        } else{
            todoUl.insertBefore(draggable, afterElement)
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo-item:not(.ondrag)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY }).element
}
//function for removing todo
function removeTodo(todoItem) {
    todoItem.remove();
    toggleEmptyContainer();
    activeTodoCount();
}

function clearCompletedHandler(e) {
    e.preventDefault();
}