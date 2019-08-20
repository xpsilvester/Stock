const http = require('http');

let data = { key: 'hello', value: 'world'};


const server = http.createServer((req, res) => {
  res.writeHead(200,{
    'content-type': 'application/json'
  });
  res.write('Hello World -- 0');
  res.end(JSON.stringify(data));
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(7999);