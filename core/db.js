// (c) Sergey Chekriy, 2015
var config = require('../config');

var dbctrlrs = require('../controllers/dbctrls');

var mySqlDb = require('mysql');
var sqlLiteDb = require('sqlite3'); 
 
exports.execSql = function(dbServer, dbName, sql, callback){
 
  if (dbServer != null){
      config.dbServer = dbServer;
  }  
  

  if (dbctrlrs.dbControllers[config.dbServer] != null){
      dbctrlrs.dbControllers[config.dbServer](dbName,sql,callback);
  } else {
      callback(null,config.dbServer+' database driver not found' );
  } 
 
 
    
};
 



	  	
	  	
	 
   
  
