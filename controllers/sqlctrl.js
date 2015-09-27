// (c) Sergey Chekriy, 2015
var db  = require('../core/db');

var httpMsgs = require('../core/httpMsgs');


exports.runSql = function(req,resp,reqBody){
	try{
		if (!reqBody) throw new Error("Input not valid");
		var data = JSON.parse(reqBody);
		if (data){
                        var dbserver=null;
                        if (data.dbServer){
                            dbserver = data.dbServer;
                        }
                        
                        var dbname=null;
                        if (data.dbName){
                            dbname = data.dbName;
                        }
                        
                        var sql=null;
                        if (data.sql){
			 sql = data.sql;
                        } else {
                         throw new Error("Input not valid");
                        }
                        
                       
			db.execSql(dbserver,dbname,sql, function(data,err){
			if (err){
					httpMsgs.send500(req,resp,err);
	
				} else {
					httpMsgs.sendJson(req,resp,data);
		
			}
		
			});
		
		} else {
			throw new Error("Input not valid");	
		}
	} catch (ex) {
		httpMsgs.send500(req,resp,ex);
	}
			

	
};





