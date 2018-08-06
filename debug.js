function mylog(string){
    process.stdout.write(string + '\n');
}


function mydebug(){
    if(process.env.NODE_DEBUG && /\bmyreq\b/.test(process.env.NODE_DEBUG)){
        let action = arguments[0];
        let item = arguments[1];
        if(action == 'req'){
            let method = item.method;
            let path = item.path;
            let headers = item.headers;
            let body = item.body;
            let info = `${method} ${path} HTTP/1.1`;
            mylog(info);
            for(let k in headers){
                mylog(k + ': ' + headers[k]);
            }
            mylog(body);
            mylog('');
        }

        if(action == 'resp'){
            let info = `HTTP/1.1 ${item.statusCode} OK`; 
            let headers = item.headers;
            let body = item.body;
            mylog(info);
            for(let k in headers){
                mylog(k + ': ' + headers[k]);
            }
            mylog(JSON.stringify(body));
            mylog('');
        }
    }
}

module.exports = mydebug;
