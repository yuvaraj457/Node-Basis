const http = require('http');
http.createServer((req,res) => {
    let body = [];
    if(req.method === 'POST'){
        req.on('error',(error) => console.error(error))
            .on('data',(chunk) => body.push(chunk))
            .on('end',() => console.log(Buffer.concat(body).toString()));
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Hello World</h1>');
        res.end();
    }
    console.log(body);
}).listen(3000);