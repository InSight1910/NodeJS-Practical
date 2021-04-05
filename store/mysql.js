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
const get = (table, id) =>
	new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} WHERE id="${id}"`,
			(err, data) => {
				if (err) return reject(err);
				resolve(data);
			}
		);
	});

const insert = (table, data) => {
	return new Promise((resolve, reject) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
};
const update = (table, data) => {
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE ${table} SET ? WHERE id="${data.id}"`,
			data,

			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
};
const query = (table, query, join) => {
	let joinQuery = "";
	if (join) {
		const key = Object.keys(join)[0];
		const val = join[key];
		joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
	}
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} ${joinQuery} WHERE ?`,
			query,
			(err, result) => {
				err ? reject(err) : resolve(result[0] || null);
			}
		);
	});
};
const upsert = (table, data) => {
	if (data && data.id) {
		return update(table, data);
	}
	return insert(table, data);
};
module.exports = {
	list,
	get,
	upsert,
	query,
};
