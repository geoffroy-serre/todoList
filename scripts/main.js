let todos = [];
const TODO_LIST_ELEMENT = document.getElementById('todos');
const INPUT = document.getElementById('todo-create');

renderTodoList();
handleEnterKey();

function handleEnterKey() {
  INPUT.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('create').click();
    }
  });
}

function createTodo() {
  if (INPUT.value.includes('<') || INPUT.value.includes('>')) {
    alert(' < and > are not allowed');
  } else if (INPUT.value !== '') {
    let todo = {
      id: Math.random().toString(36).slice(2),
      text: INPUT.value,
      validated: false,
    };
    console.log('TODO IS ' + JSON.stringify(todo));
    todos.push(todo);
    renderTodoList();
    INPUT.value = '';
  }
}

function renderTodoList() {
  TODO_LIST_ELEMENT.innerHTML = '<span id="no-todos"><img src="./imgs/to-do-list.png" width="30px"/> Create todos to begin</span>';
  if (todos.length !== 0) {
    document.getElementById('no-todos').style.display = 'none';
    todos.forEach((todo, index) => {
      TODO_LIST_ELEMENT.innerHTML += todoTemplate(index + 1, todo.id, todo.text);
    });
  }
}

function deleteTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos.splice(i, 1);
    }
  }
  renderTodoList();
}

function reset() {
  todos = [];
  renderTodoList();
}

function todoTemplate(count, id, text) {
  return `
    <li id="${id}" onclick="validateTodo('${id}')"><span class="todos_text">${count} -  ${text}</span><span class="close" onclick="deleteTodo('${id}')">X</span></li>
    `;
}

function validateTodo(id) {
  const TODO = document.getElementById(id);
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      if (TODO.validated) {
        TODO.validated = false;
        TODO.classList.remove('validated');
      } else {
        TODO.validated = true;
        TODO.classList.add('validated');
      }
    }
  }
  console.log('TODO IS NOW: ' + TODO.validated);
}
