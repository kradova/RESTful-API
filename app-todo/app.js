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


todos.forEach(item => {
    addToList(item);
});



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
    console.log(newTodo);
    list.append(newTodo);
}// addToList

function deleteItem(itemID) {

}

function changeIsDone(itemID) {

}

