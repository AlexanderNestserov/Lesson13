'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];
const toDo = JSON.parse(localStorage.getItem('toDoData'));
const render = function () {

   todoList.innerHTML = '';
   todoCompleted.innerHTML = '';
   toDoData.forEach(function (item) {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
         '<div class="todo-buttons">' +
         '<button class="todo-remove"></button>' +
         '<button class="todo-complete"></button>' +
         '</div>';
      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }
      if (item.removed) {
         li.remove();
      }
      li.querySelector('.todo-complete').addEventListener('click', function () {
         item.completed = !item.completed;
         render();
      });
      li.querySelector('.todo-remove').addEventListener('click', function () {
         item.removed = !item.removed;
         render();
      });
   });
   localStorage.setItem('toDoData', JSON.stringify(toDoData));

};

todoControl.addEventListener('submit', function (event) {
   event.preventDefault();
   const newToDo = {
      text: headerInput.value,
      completed: false,
      removed: false
   };

   if (headerInput.value != '') {
      toDoData.push(newToDo);
      render();
   } else {
      headerInput.value = '';
      render();
   }
   headerInput.value = '';
});


