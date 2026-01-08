const http = require('http');
const fs = require('fs');
 
const requstCycle = (req, res)=>{
    let filepath = "";
    switch(req.url){
        case "/" :
            filepath = './home.html'
            break;
        case "/about" :
            filepath = './about.html'
            break;
        case "/Services" :
            filepath = './Services.html'
            break; 
        case "/contact" :
            filepath = './contact.html'
            break;
         default :
            filepath = './notFound.html'
            break;
    }

    let result = fs.readFileSync(filepath, 'utf-8');
    res.end(result);
}

const server = http.createServer(requstCycle);

server.listen(8000, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(`server start at http://localhost:8000`);
})