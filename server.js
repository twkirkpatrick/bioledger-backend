const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

const handleDisconnect = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  connection.connect((err) => {
    if (err) {
      console.log("error connecting: " + err.stack);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("connected as id " + connection.threadId);
    }
  });

  connection.on("error", (err) => {
    console.log("db error");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();

//*Initialize server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
