const fs = require('fs');
const http = require('http');

http.createServer( async(req,res) => {
    console.log(req.searchParams);
    const myurl = new URL('http://localhost'+req.url);
    let req_data = '';

    await req.on('error',(err) => { console.log(err) })
        .on('data',(chunk)=> req_data+=chunk.toString());
    
        res.writeHead(200,{'Content-Type':'text/html'});

    if(myurl.searchParams.has('employeename')){
        req_data += myurl.searchParams.get('employeename');
        }

    try{
        var data =  JSON.parse(fs.readFileSync('text1.json','utf-8'));
        }
    catch(error){
        console.error(error);
        }

    const filter_data = data.filter( x => x['name']== req_data );

    if(filter_data.length){
        res.write('Employee Found ');
        res.write(JSON.stringify(filter_data));
    }
    else{
        res.write("Employee Not Found");
    }
    res.end()

}).listen(3000,(err) => {
    if(err) throw err;
    else{
    console.log('Port Listening');
}
});
