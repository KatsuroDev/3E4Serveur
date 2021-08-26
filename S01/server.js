const http = require('http'); // include

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Bonjour mon premier serveur!');

    console.log(request);
});

server.listen(7777, 'localhost', () => {
    console.log("Le serveur est démarré.");
});