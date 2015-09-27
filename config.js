// (c) Sergey Chekriy, 2015
//defaults db settings, can be overriden by requests to server (POST)


//hardcoded settings
exports.port = 9876;
exports.httpMsgsFormat = "JSON";

//default db driver, can be changed by POST request parameter
exports.dbServer = 'mysql';

//connection settings for respective database drivers
exports.dbConfig = {
    mysql:{
        user: "root",
        password: "qwe123",
        host: "localhost",
        database: "SampleDB" 	
    },
    sqlite:
    {
        database: "../test.db" 	
    }        
    
};
/*
exports.mysqlDbConfig = {
  user: "root",
  password: "qwe123",
  host: "localhost",
  database: "SampleDB" 	
	
};

exports.sqliteDbConfig = {
  database: "../test.db" 	
	
};
*/

