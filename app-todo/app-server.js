let todos = [];
getData();


/** Change isDone
*=================*/
$("#list").on("change", ".form-check-input", (event) => {
    let element = event.target;
    let itemID = $(element).data("id");//получаем id того элемента на котором произошло изменение
    
    const urlTodos = "http://localhost:3000/todos/" + itemID;//формирование url для отправки данных на сервер(нужный url предоставляется разработчиками сервера)
    const method = "PUT";
    let itemToUpdate = {};
    todos.forEach(item => {
        if (itemID == item.id) {
            if (item.isDone === "true") {
                item.isDone = "false";
            } else {
                item.isDone = "true";
                //$(element).parrent.css('text-decoration', 'line-through');
            }
            itemToUpdate = item;
        }
    });//перебираем и сравниваем id, когда находим тот на котором было нажатие,меняем его isDone
    let newData = itemToUpdate;
    $.ajax({
        url: urlTodos,
        method: method,
        data: newData,
        dataType: "json"
    }).done(function (response) {
        console.log("Result after changing isDone:\n", response);//получение измененных данных из сервера
        getData();//получение всех todo с сервера(с новыми изменениями) и отрисовка их в браузере
    });
    //console.log(todos);
});// Change isDone

/** Delete ToDo
 *==============*/
$("#list").on("click", ".js-btn-delete", (event) => {
    let element = event.target;//содержит элемент браузера на котором произошло событие
    let itemID = $(element).data("delete-id");//полчение id
    const url = "http://localhost:3000/todos/" + itemID;//формирование url для отправки данных на сервер(нужный url предоставляется разработчиками сервера)
    const method = "DELETE";

    $.ajax({
        url,
        method,
        dataType: "json"
    }).done(function (response) {
        console.log("Result after deletting:\n", response);//получение измененных данных из сервера
        getData();//получение всех todo с сервера(с новыми изменениями) и отрисовка их в браузере
    });

});// Delete ToDo


/** add all items in todos array  to the DOM in the browser 
===========================================================*/
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

/** create html for one todo and add it to the DOM in the browser 
=================================================================*/
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


/** creating a NEW Todo
 ======================*/
$("#form").on("submit", (event) => {
    event.preventDefault(); // прерываем отправку данных самой формой(поведение формы по умолчанию)
    let data = $("#form").serializeArray(); // получаем все данные из формы в виде массива(name: value)
    /*
        0: {name: 'title', value: 'T3'}
        1: {name: 'isDone', value: 'false'}
    */
    //console.log(data); return;
    const id = getNextID();
    const title = data[0].value;
    if (title.length < 2) {
        alert("Название не может быть меньше двух букв");
        return;
    } // валидация данных
    const isDone = data[1].value;
    // формируем данные для отправки на сервер для создания НОВОГО ToDo
    let newTodo = {
        id,
        title,
        isDone
    }
    //console.log(newTodo, todos);return;

    const urlTodos = "http://localhost:3000/todos";
    const method = "POST";
    // отправляем асинхронно данные на сервер(делаем запрос[request] методом POST)
    $.ajax({
        url: urlTodos,
        method: method,
        data: newTodo,
        dataType: "json"
    }).done(function (response) {
        //получение данных от сервера в случае удачного запроса 
        newTodo = response; //после добавления нового todo возвращает созлданный объект с новым ID
        console.log(newTodo);
        todos.push(newTodo);// добавляем новый элемент в конец массива todos
        console.log(todos);
        showTodos();// выводим массив todos в браузер в виде HTML
    });

    $("form")[0].reset(); // очищаем форму после отправки данных
});

function getNextID() {
    let maxID = 0;
    todos.forEach(todo => {
        let id = parseInt(todo.id);
        if (maxID < id) {
            maxID = id;
        }
    });

    return maxID + 1;
}





