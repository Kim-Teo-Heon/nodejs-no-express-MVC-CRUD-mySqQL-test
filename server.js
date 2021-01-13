const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const read = require('./controllers/read');
const create = require('./controllers/create');
const delete_ = require('./controllers/delete');
const index='./views/index.ejs'

let file_path='';
let data_='';


function redirect(req,res) {
    file_path=index;
    read.read_data(req,res,function(data) {
        data_=data;
    });
}

http.createServer(function (req, res) {

    file_path = req.url;
    switch(file_path){
        case '/':
        redirect(req,res);
        break;
        case "/index.css":
        file_path='./views/index.css';
        break;

        case '/create' : 
        file_path=index;
        create.create_data(req, res);
        read.read_data(req,res,function(data) {
            data_=data;
        });
        break;

        // case '/delete' : 
        // file_path=index;
        // delete_.delete_data(req,res);
        // read.read_data(req,res,function(data) {
        //     data_=data;
        // });
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