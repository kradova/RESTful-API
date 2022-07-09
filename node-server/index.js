const http = require("http");

http.createServer(handler).listen(3000);

function handler(request, response) {
    console.log("Url: " + request.url);
    console.log("Тип запроса: " + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(request.headers);

    response.setHeader("Content-Type", "text/html; charset=utf-8;");

    if (request.url === "/home" || request.url === "/") {
        response.write("<h2>Home</h2>");
    }
    else if (request.url == "/about") {
        response.write("<h2>About</h2>");
    }
    else if (request.url == "/contact") {
        response.write("<h2>Contacts</h2>");
    }
    else {
        response.write("<h2>Not found</h2>");
    }
    response.end();
}