// (c) Sergey Chekriy, 2015
var http= require("http");

var sqlCtrl = require("../controllers/sqlctrl");

var config =  require("../config");

var httpMsgs =  require("./httpMsgs");


http.createServer(function(req,resp){
	
	switch(req.method){
          case "GET":
	  	if (req.url === "/"){
                    httpMsgs.sendHome(req,resp);
	  	} else {
                    httpMsgs.send404(req,resp);
	  					
	  	}
	  	break;  
	  case "POST":
   	  	if (req.url === "/sql"){
  		
  		var reqBody = '';
  		req.on("data", function(data){
  			reqBody += data;
  			
  			if (reqBody.length > 1e7){ //10mb
  			  httpMsgs.send403(req,resp);
  			}
  		});
  		req.on("end", function(){
  			sqlCtrl.runSql(req,resp,reqBody);
  		});
	  	} else {
	  		httpMsgs.send404(req,resp);
	  	}	
	  	break;	
	  

	  default:
	  	httpMsgs.send405(req,resp);
	  	break;
	  			
	}
	
}).listen(config.port, function(){
	console.log("SQL Broker (c) Sergey Chekriy (sergey.chekriy@me.com), listening at: "+config.port);
});