let todos = [];
getData();


/** Change isDone
*=================*/
$(".form-check-input").on("change", (event) => {
    let element = event.target;
    let itemID = $(element).data("id");

    todos.forEach(item => {
        if (itemID == item.id) {
            if (item.isDone === "true") {
                item.isDone = "false";
            } else {
                item.isDone = "true";
                //$(element).parrent.css('text-decoration', 'line-through');
            }
        }
    });
    //console.log(todos);
});// Change isDone

/** Delete ToDo
 *==============*/
$("#list").on("click", ".js-btn-delete", (event) => {
    let element = event.target;
    let itemID = $(element).data("delete-id");
    let idToDelete = -1;
    for (let i = 0; i < todos.length; i++) {
        const el = todos[i];
        if (el.id == itemID) {
            idToDelete = i;
            break;
        }
    }
    delete todos[idToDelete];
    todos = renameTodosKeys(todos);
    showTodos();
});// Delete ToDo

function renameTodosKeys(todos) {
    let temp = [];
    let i = 0;
    todos.forEach(todo => {
        temp[i] = todo;
        i++;
    });
    return temp;
}

function showTodos() {
    $("#list").html("");
    todos.forEach(item => {
        addToList(item);
    });
}


function getData() {
    const urlTodos = "http://localhost:3000/todos";
    const method = "GET";
    $.ajax({
        url: urlTodos,
        method: method,
        dataType: "json"
    }).done(function (response) {
        //console.log(response);
        todos = response;
        if (todos.length > 0) {
            showTodos();
        }
    });
    return [];
}

function addToList(item) {
    //console.log(item);
    let list = $("#list");
    let newTodo = $("#item-template").html();
    newTodo = newTodo.replace(/\{id\}/g, item.id).replace("{title}", item.title);
    if (item.isDone === "true") {
        newTodo = newTodo.replace("{isdone}", "checked");
    } else {
        newTodo = newTodo.replace("{isdone}", "");
    }
    //console.log(newTodo);
    list.append(newTodo);
}// addToList

$("#form").on("submit", (event) => {
    event.preventDefault();
    let data = $("#form").serializeArray();
    //console.log(data);
    const id = getNextID();
    const title = data[0].value;
    if (title.length < 2) {
        alert("Название не может быть меньше двух букв");
        return;
    }
    const isDone = data[1].value;
    let newTodo = {
        id,
        title,
        isDone
    }
    //console.log(newTodo);
    const nextItemID = todos.length;
    todos[nextItemID] = newTodo;

    const urlTodos = "http://localhost:3000/todos";
    const method = "POST";
    $.ajax({
        url: urlTodos,
        method: method,
        data: newTodo,
        dataType: "json"
    }).done(function (response) {
        console.log(response);
    });

    addToList(newTodo);
    console.log(todos);
    $("form")[0].reset();
});

function getNextID() {
    let maxID = 0;
    todos.forEach(todo => {
        if (maxID < todo.id) {
            maxID = todo.id;
        }
    });

    return maxID + 1;
}





