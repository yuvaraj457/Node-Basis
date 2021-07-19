const cpuNum = require('os').cpus().length;
const http = require('http');
const cluster = require('cluster');

if(cluster.isMaster){
    for(let i=0;i<=cpuNum;i++){
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
}
else{
    http.createServer((req,res) => {
        res.writeHead(200);
        res.write(`message send by ${process.pid}\n`);
        res.write('Hello World');
        res.end();
        // cluster.worker.kill();
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);

}