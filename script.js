'use strict';

const table = document.querySelector("table");
const todo = document.getElementById("todo");
const select = document.querySelector("select");
const date = document.querySelector('input[type="date"]');
const submit = document.getElementById("submit");

let todoItems = [];

function searchTodos(searchTerm) {
    if (!searchTerm) return todoItems;
    return todoItems.filter(item => 
        item.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

function addTodoItem(todoText, priority, dateValue) {
    const newItem = {
        id: Date.now(),
        todo: todoText,
        select: priority,
        date: dateValue,
        done: false
    };
    todoItems.push(newItem);
    return newItem;
}

function validateInput(value) {
    return value !== "";
}

submit.addEventListener("click", () => {
    if (!validateInput(todo.value)) {
        window.alert("Todoを入力してください");
        return;
    } 
    
    if (!validateInput(select.value)) {
        window.alert("優先度を入力してください");
        return;
    }
    
    if (!validateInput(date.value)) {
        window.alert("期日を入力してください");
        return;
    }    

    addTodoItem(todo.value, select.value, date.value);
    
    function resetForm() {
        todo.value = '';
        select.value = '普';
        date.value = '';
    }
    resetForm();

    const currentSearch = searchInput.value;
    const filteredItems = currentSearch ? searchTodos(currentSearch) : todoItems;
    updateDisplay(filteredItems);
});

function updateDisplay(items = todoItems) {
    const rows = table.querySelectorAll('tr');
    rows.forEach((row, index) => {
    if (index !== 0) row.remove();
    });
    items.forEach(item => createTableRow(item));
}

function createTableRow(item) {
    const tr = document.createElement("tr");
    
    Object.entries(item).forEach(([key, value]) => {
        if (key === 'id') return;
        
        const td = document.createElement("td");
        if (key === "done") {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = value;
            td.appendChild(checkbox);
        } else {
            td.textContent = value;
        }
        tr.appendChild(td);
    });
    
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", () => {
        if (confirm("このタスクを削除しますか？")) {
            removeTodoItem(item.id);
        }
    });
    deleteTd.appendChild(deleteBtn);
    tr.appendChild(deleteTd);
    table.appendChild(tr);
}

function removeTodoItem(id) {
    todoItems = todoItems.filter(item => item.id !== id);
    updateDisplay();
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function(e) {
    const searchKeyword = e.target.value;
    const filteredItems = searchTodos(searchKeyword);
    updateDisplay(filteredItems);
});

updateDisplay();


