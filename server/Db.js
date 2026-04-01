const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  connectionLimit: 100, // You can adjust this value based on your requirements
  // host: "localhost",
  // user: "root",
  // password:  "6e@DNKN5RcKHIKMJ",
  charset: 'utf8mb4',
  // database:"skilleareum_pilot"
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});
console.log("MYSQL COnnected Successfully");
const executeQuery = async (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { db, executeQuery };

