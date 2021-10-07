const http = require("http");
const path = require("path");
const fs = require("fs")


const server = http.createServer((req, res) => {
  
  if(req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(data)
    })
  }
  else if(req.url === "/api/users") {
   const users = [
     {name: 'Bob Smith', age: 40},
     {name: "John Doe", age: 38}
   ];
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(users))
  }
  

  

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))