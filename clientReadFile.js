const http = require('http');

const argvs = process.argv.pop();

const options = {
    hostname : 'localhost',
    path : '/',
    port : 3000,
    method : 'POST',
    headers : {
        'Context-Type':'application/json'
    }
}

const req = http.request( options,res=> {
    console.log(`Status:${res.statusCode}`);
    res.on('data',d=>process.stdout.write(d));
});

req.on('error',(error)=>console.error(error));
req.write(argvs);
req.end();