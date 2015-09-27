// (c) Sergey Chekriy, 2015
var config = require("../config");

exports.send500 = function(req,resp,err){
        if (isObject(err)){
            txt_err = JSON.stringify(err);
        } else {
            txt_err = err;
        }
        httpErrMsg(500,"Internal error occured:"+txt_err,req,resp);
};

exports.sendJson = function(req,resp,data){
	resp.writeHead(200,{"Content-Type":"application/json"});
	if (data){
		resp.write(JSON.stringify(data));
	} 
		
	resp.end();	
}


exports.send405 = function(req,resp){
        httpErrMsg(405,"Method not supported",req,resp);
};

exports.send404 = function(req,resp){
        httpErrMsg(404,"Resource not found",req,resp);
};

exports.send413 = function(req,resp){
        httpErrMsg(413,"Request entity too large",req,resp);
};

exports.send200 = function(req,resp){
	resp.writeHead(200,{"Content-Type":"application/json"});	
	resp.end();	
};

exports.sendHome = function(req,resp){
	
	if (config.httpMsgsFormat === 'HTML'){
            resp.writeHead(200,{"Content-Type":"application/json"});
            resp.write('<html><head><title>SQL Broker</title></head><body>URL /sql, POST JSON {dbServer: "mysql | oracle", dbName: "dbname", sql: "sql statement"}</body></html>');
	} else {
            resp.writeHead(200,{"Content-Type":"application/json"});                                            
            resp.write(JSON.stringify({url: "/sql", operation: "POST", format: "JSON {dbServer: 'mysql | sqlite', dbName: 'dbname', sql: 'sql statement'} "}));
	}
	resp.end();
	
}

function httpErrMsg(code,msg,req,resp){
	if (config.httpMsgsFormat === 'HTML'){
            resp.writeHead(code,msg,{"Content-Type":"text/html"});
            resp.write('<html><head><title>413</title></head><body>'+code+': '+msg+'</body></html>');
	} else {
            resp.writeHead(code,msg,{"Content-Type":"text/html"});
            resp.write(JSON.stringify({data: msg}));
	}
	resp.end();
		
};

function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
};