/*
*
*  Copyright (c) 2015 Sergey Chekriy, sergey.chekriy@me.com
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
================================================================= 
Installation:

 git clone  https://github.com/sergey-chekriy/node-sqlbroker.git
 npm install
 npm start

=================================================================

SQLBroker is node server to perform sql requests (CRUD) against any database 
which is supported by node. Server accepts POST requests in JSON format:


{
    "dbServer":"db driver name",
    "dbName": "database name",
    "sql": "sql request"
}

Examples:

{
 "dbServer":"mysql",
 "dbName": "SampleDb",
 "sql": "select * from employees"
}

{
 "dbServer":"sqlite",
 "dbName":"test.db",
 "sql":"insert into emp (id, name, year_slr) VALUES (10, 'John Smith', 120000);”
}

Results returned by server in JSON format. I.e. in case of 'select' sql 
request -  array of JSON objects corresponding to selected records will be 
returned.
SQLBroker accepts requests to different databases during one session, i.e. it 
can work simultaneously with MongoDb, Oracle, MySql etc., you can base you 
requests to Oracle,
on the results you got from Mongo etc.
Community version supports MySql and SqLite, but easily can be extended, 
if needed.
To run SQLBroker as minimum you will need to setup your connection parameters 
in config.js, dbConfig. For instance, if you
will work with MySQL you will need to setup connection object with your 
username, password in dbConfig['mysql'].

If you would like to extend SQLBroker to support additional database driver, 
for instance Microsoft SQL, you will need: 
1. install node library to support Microsoft SQL;
2. add MSSQL config object with connection parameters to config.js 
   (exports.dbConfig) with 'mssql' key.
3. add to dbControllers object (controllers/dbctrls.js) pair 
   'mssql': function(dbName,sql,callback){}, in function you will need to 
   use dbConfig['mssql'] object from config module to connect to MSSQL 
   database and process sql request (in 'sql' parameter), see how it is 
   implemented in 'mysql' function in controllers/dbctrls.js.

No control of sql request and security controls are implemented in community 
version of SQLBroker (i.e. 'drop table' is possible).
