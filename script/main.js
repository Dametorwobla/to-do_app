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