var ejs = require('ejs');
var mysql = require('mysql');

function getConnection() {
    var connection = mysql.createConnection({
      
      host: '127.0.0.1',
      user: 'root',
      password:'mypassword',
      database: 'twitterdb',
      port: 3306
    /*
      host: 'twitterdb.cbbx8rrpvgcr.us-west-2.rds.amazonaws.com',
      user: 'myuser',
      password: 'mypassword',
      database: 'twitterdb',
      port: 3306
    */
      /*
        host: 'us-cdbr-iron-east-02.cleardb.netd',
        user: 'b917ced1f03450',
        password: 'fb64a271',
        database: 'ad_abf6fb0a6c3832c',
        port: 3306
      */
    });
    return connection;
}

exports.fetchData = function (sqlQuery, callback) {

    console.log("\nSQL Query::" + sqlQuery);

    var connection = getConnection();

    connection.query(sqlQuery, function (err, rows, fields) {

        if (err) {
            console.log("ERROR: " + err.message);
        } else { // return err or result

            callback(err, rows);

        }
    });
    console.log("\nConnection closed..");
    connection.end();
}
