'use strict';

// STUDENT DATA //
module.exports.userData = (event, context, callback) => {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    ssl      : process.env.SSL,
    password : process.env.PASSWORD,
    port     : process.env.PORT,
    database : process.env.DATABASE
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });

  let id = event['pathParameters']['id'];

  connection.query("SELECT * FROM users WHERE id=" + id, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: result
        //input: event,
      })
    };
    callback(null, response);
  });
  connection.end();
};