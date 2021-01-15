const http = require('http');
const fs = require('fs');
const url = require('url')
const path = require('path');
const ejs = require('ejs');
const read = require('./controllers/read');
const create = require('./controllers/create');
const delete_ = require('./controllers/delete');
const update=require('./controllers/update');
const qs= require('qs');

let file_path='';
let data_='';


function promise() {
    return new Promise((resolve, reject)=>{
        resolve();
    })
}


function redirect(req, res, file_path) {
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

}

http.createServer(function (req, res) {

    let query_data = url.parse(req.url  , true).query;
    let path_name = url.parse(req.url, true).pathname
    file_path = req.url;
    
    // switch(file_path){
    //     case '/':
    //     redirect(req,res);
    //     break;
    //     case "/index.css":
    //     file_path='./views/index.css';
    //     break;

    //     case '/create' : 
    //     file_path=index;
    //     create.create_data(req, res);
    //     redirect(req,res);
    //     break;

    //     case '/delete' : 
    //     file_path=index;
    //     delete_.delete_data(req,res);
    //     read.read_data(req,res,function(data) {
    //         data_=data;
    //     });
    // }

    // var extname = path.extname(file_path);
    // var mime_types = {
    //     '.ejs': 'text/html',
    //     '.js': 'text/javascript',
    //     '.css': 'text/css',
    //     '.json': 'application/json',
    //     '.png': 'image/png',
    //     '.jpg': 'image/jpg',
    //     '.gif': 'image/gif',
    //     '.svg': 'image/svg+xml',
    //     '.wav': 'audio/wav',
    //     '.mp4': 'video/mp4',
    //     '.woff': 'application/font-woff',
    //     '.ttf': 'application/font-ttf',
    //     '.eot': 'application/vnd.ms-fontobject',
    //     '.otf': 'application/font-otf',
    //     '.wasm': 'application/wasm'
    // };
    // var contentType = mime_types[extname] ;
    // fs.readFile(file_path, 'utf-8', function(error, content) {
    //     if (error) {
    //         throw error;
    //     }
    //         res.writeHead(200, { 'Content-Type': contentType });
    //         res.end(ejs.render(content,{data : data_}), 'utf-8');
    // });


    if(file_path==='/'){
        file_path='./views/index.ejs';
        promise().then(()=>{
            read.read_data(req,res,function(data) {
                data_=data;
            });
            promise();
        }).then(()=>{
            return setTimeout(()=>{
                redirect(req, res, file_path);
            },100);
        })
        
    } else if(file_path==='/index.css'){
        file_path='./views/index.css';
        redirect(req, res, file_path);
    } else if(file_path==='/create'){
        promise().then(()=>{
            create.create_data(req, res);
            promise();
        }).then(()=>{
            return setTimeout(()=>{
                res.writeHead(302,{Location : '/'});
                res.end();
            },100);
        })
    } else if(file_path==='/delete'){

        promise().then(()=>{
            delete_.delete_data(req,res);
            promise();
        }).then(()=>{
            return setTimeout(()=>{
                res.writeHead(302,{Location : '/'});
                res.end();
            },100);
        })
    } else if(path_name === '/update'){
        console.log('update');
        file_path='./views/update-form.ejs';
        data_=query_data;
        console.log(data_.id);
        redirect(req, res, file_path);
    } else if(file_path === '/update_process'){
        promise().then(()=>{
            update.update_data(req,res);
            promise();
        }).then(()=>{
            return setTimeout(()=>{
                res.writeHead(302,{Location : '/'});
                res.end();
            },100);
        })
    }

        
}).listen(3000);