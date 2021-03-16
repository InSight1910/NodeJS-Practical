const mysql = require("mysql");

const config = require("../config");

const dbconf = {
	host: "remotemysql.com",
	user: "6cnTpxSDBK",
	password: "uovRX2tlwg",
	database: "6cnTpxSDBK",
	port: 3306,
};

// Connect

let connection;

const handleCon = () => {
	connection = mysql.createConnection(dbconf);
	connection.connect((err) => {
		if (err) {
			console.log("[db error]", err);
			setTimeout(handleCon, 2000);
		} else {
			console.log("DB Connected");
		}
	});
	connection.on("error", (err) => {
		console.error("[db error]", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleCon();
		} else {
			throw err;
		}
	});
};

handleCon();

const list = (table) =>
	new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table}`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
module.exports = {
	list,
};
