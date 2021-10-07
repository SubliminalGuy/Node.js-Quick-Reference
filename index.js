const http = require("http");
const path = require("path");
const fs = require("fs")


const server = http.createServer((req, res) => {
  
  // if(req.url === "/") {
  //   fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
  //     if (err) throw err;
  //     res.writeHead(200, {"Content-Type": "text/html"});
  //     res.end(data)
  //   })
  // }
  // else if(req.url === "/api/users") {
  // const users = [
  //   {name: 'Bob Smith', age: 40},
  //   {name: "John Doe", age: 38}
  // ];
  //   res.writeHead(200, {"Content-Type": "application/json"});
  //   res.end(JSON.stringify(users))
  // }

  // Build file path
  let filePath = path.join(__dirname, 'public', req.url === "/" ? "index.html" : req.url)
  

  // Extension
  let extname = path.extname(filePath);

  // Initial Content Type
  let contentType = 'text/html';

  // Check ext and set content type
  switch(extname)  {
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
    case '.json':
      contentType = 'application/json'
      break;
    case '.png':
      contentType = 'image/png'
      break;
    case '.jpg':
      contentType = 'image/jpg'
      break;
  }

  // check html extension and add it if it is missing
  if (contentType == "text/html" && extname == "") filePath += ".html";
  console.log(contentType)
  
  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(data, "utf8")
        })
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`)
      }
    } else {
      // Success
      res.writeHead(200, {"Content-Type": contentType});
      res.end(content, 'utf8')
    }
    
  })

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))