var http = require('http');
var fs = require('fs');
var path = require('path');
const ejs = require('ejs');
const read = require('./controllers/read');
let data_='';

http.createServer(function (req, res) {

    var file_path = req.url;
    let data;
    switch(file_path){
        case '/':
        read.read_data(req,res,function(data) {
            data_=data;
        });
        file_path='./views/index.ejs'
        console.log('server',data_);
        break;
        case "/index.css":
        file_path='./views/index.css';
        break;
    }



    var extname = path.extname(file_path);
    var mime_types = {
        '.ejs': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };
    var contentType = mime_types[extname] ;

    fs.readFile(file_path, 'utf-8', function(error, content) {
        if (error) {
            throw error;
        }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(ejs.render(content,{data : data_}), 'utf-8');
    });
}).listen(3000);