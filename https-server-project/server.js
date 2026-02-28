const http = require('http');
let users = [
    { id: 1, name: "Shivani" },
    { id: 2, name: "Rahul" }
];

const server = http.createServer((req, res) => {
    // GET /users
    if (req.method === 'GET' && req.url === '/users') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }
    // GET /
    else if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Welcome to User Manager API!');
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});