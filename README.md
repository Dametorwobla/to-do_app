[![Forks][forks-shield]](https://github.com/Dametorwobla/to-do_app/forks)
[![Stargazers][stars-shield]](https://github.com/Dametorwobla/to-do_app/stargazers)
[![Issues][issues-shield]](https://github.com/Dametorwobla/to-do_app/issues)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/david-ametorwobla-353224a1/)

# Project Title - To-do app

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)



## Overview
This is a solution to Amalitech's To-do app frontend project.

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- Drag and drop to reorder items on the list
- Buid this project as a full-stack application

### Screenshot

![Desktop](./desktop_cover.png)

### Links

[- Solution URL ](https://github.com/dametorwobla/to-do_app)

[- Live Site URL](https://amalitechtodoapp.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [SortableJS](https://github.com/SortableJS/Sortable/) - Sortable is a JavaScript library for reorderable drag-and-drop lists.

### What I learned

[HTML <**template**> tag: hold some content that will be hidden when the page loads. Use JavaScript to display it](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)

```html
<template id="task-template">
  <li class="task">
    <input class="task-input" type="checkbox" />
    <label>
      <span class="custom_checkbox"></span>
    </label>
    <span class="deleteBtn">
      <img class="delete" src="./images/icon-cross.svg" alt="" />
    </span>
  </li>
</template>
```

```css
.card {
  background: var(--input-and-card);
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  min-height: fit-content;
  border-radius: 5px;
  margin-top: 2rem;
  box-shadow: -5px 0 20px 15px rgba(0, 0, 0, 0.2);
}
```

```js
const taskElement = document.importNode(taskTemplate.content, true);
const checkbox = taskElement.querySelector('input');
checkbox.id = todo.id;
checkbox.checked = todo.completed;
const label = taskElement.querySelector('label');
label.htmlFor = todo.id;
label.append(todo.name);
const deleteBtn = taskElement.querySelector('img');
deleteBtn.id = todo.id;
listContainer.appendChild(taskElement);
```

### Useful resources

- [YouTube](https://www.youtube.com/watch?v=W7FaYfuwu70&t=1252s) - This helped me to understand the **template** tag and how to use it

## Author

- Website - [David](https://amalitechtodoapp.netlify.app)
- Amalitech Porject - [Dametorwobla](https://www.github.com/dametorwobla/to-do_app/)