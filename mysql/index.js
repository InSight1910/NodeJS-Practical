const express = require("express");
const config = require("../config");
const mysql = require("./network");
const app = express();

app.use(express.json());
app.use("/api/mysql", mysql);

app.listen(config.mysqlService.port, () => {
	console.log("Listening on port", config.mysqlService.port);
});
