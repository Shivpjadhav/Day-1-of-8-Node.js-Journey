const http = require('http');
let users = [
    { id: 1, name: "Shivani" }
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
    else if (req.method === 'POST' && req.url === '/users') {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const user = JSON.parse(body);
        user.id = users.length + 1;
        users.push(user);

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user));
    });
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2]);
    const index = users.findIndex(u => u.id === id);

    if(index !== -1){
        const deleted = users.splice(index, 1);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(deleted[0]));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('User not found');
    }
}
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});