const http = require ('http');

// Create server object
http.createServer((req, res) => {
  // Write response
  res.write("Hello World");
  res.end()
}).listen(500, () => console.log("Server running..."));