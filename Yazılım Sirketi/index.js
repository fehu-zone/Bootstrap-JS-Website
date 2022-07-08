const http = require("http");
const fs = require('fs').promises;
var mime = require('mime-types');
const database = require('./database');
var qs = require('querystring');

const host = //please ip adrres;
const port = 8000;



const requestListener = function (req, res) {
    file=__dirname + "/public/cark yazılım"+req.url;
    
    if (req.method == 'POST') {
        if(req.url=='/message/save'){
            var body = '';

            req.on('data', function (data) {
                body += data;
                
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });
    
            req.on('end', function () {
                var post = qs.parse(body);
                database.insert('databases/contact',post);
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end("OK");
            });
          
        }else if(req.url=='/mail/save'){
            var body = '';

            req.on('data', function (data) {
                body += data;
                
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });
    
            req.on('end', function () {
                var post = qs.parse(body);
                database.insert('databases/mail',post);
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end("OK");
            });
          
        }else{
            console.log(req);
        }
    
    }else if(req.method=='GET'){
        if(req.url!='' && req.url!='/'){
        
            fs.readFile(file)
            .then(contents => {
                const mimeType=mime.lookup(file);
              
                if(mimeType){
                    res.setHeader("Content-Type", mimeType);
                }else{
                    res.setHeader("Content-Type", "text/html");
                }
                
                res.writeHead(200);
                res.end(contents);
            })
        }else{
            fs.readFile(__dirname + "/public/cark yazılım/index.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
        }
    }
  
   
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});