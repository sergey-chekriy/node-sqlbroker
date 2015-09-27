// (c) Sergey Chekriy, 2015
var config = require('../config');
var mySqlDb = require('mysql');
var sqlLiteDb = require('sqlite3'); 


//database drivers controllers
exports.dbControllers = {
      'mysql':
      function(dbName,sql,callback){
                if (dbName != null){  
                    config.dbConfig['mysql'].database = dbName;
                }  

                var connection = new mySqlDb.createConnection(config.dbConfig['mysql']);

                connection.connect(function(err) {
                      if (err) {
                        console.error('error connecting: ' + err.stack);
                        callback(null,err);
                        return;
                      } else {

                            console.log('connected as id ' + connection.threadId);
                            console.log('dbserver=mysql; '+'dbname='+config.dbConfig['mysql'].database+'; sql='+sql);
                            connection.query(sql, function (err, results, fields) {
                                    if(err){
                                            callback(null,err);
                                    } else {
                                            callback(results);
                                    }
                            });


                      }

               });

            },
       'sqlite':
       function(dbName,sql,callback){
            if (dbName != null){  
                config.dbConfig['sqlite'].database = dbName;
            }  

            var db = new sqlLiteDb.Database(config.dbConfig['sqlite'].database);

            db.all(sql,[],function(err,results) {

                if(err){
                        callback(null,err);
                } else {
                        callback(results);
                }
            }); 
        }
             
    
};