const DB = `[
    {
        "id": 1,
        "title": "ToDo1",
        "isDone": "true"
    },
    {
        "id": 2,
        "title": "ToDo2",
        "isDone": "false"
    },
    {
        "id": 3,
        "title": "ToDo3",
        "isDone": "false"
    }
]`;

let todos = getData();
//console.log(todos);

showTodos();

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
    console.log(todos);
});// Change isDone

/** Delete ToDo
 *==============*/
$("#list .js-btn-delete").on("click", (event) => {
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
    showTodos();
});// Delete ToDo



function showTodos() {
    $("#list").html("");
    todos.forEach(item => {
        addToList(item);
    });
}


function getData() {
    return JSON.parse(DB);
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

function deleteItem(itemID) {

}








