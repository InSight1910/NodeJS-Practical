const request = require("request");
const createRemoteDB = (host, port) => {
	const URL = `http://${host}:${port}/api/mysql`;
	const req = (method, table, data) => {
		let url = `${URL}/${table}`;
		let body;
		if (method === "GET" && data) {
			url += `/${data}`;
		} else if (data) {
			body = JSON.stringify(data);
		}
		return new Promise((resolve, reject) => {
			console.log(body);
			request(
				{
					method,
					headers: {
						"content-type": "application/json",
					},
					url,
					body,
				},
				(err, req, body) => {
					if (err) {
						console.error(["BD ERROR"], err);
						reject(err.message);
					}
					const res = JSON.parse(body);
					return resolve(res.body);
				}
			);
		});
	};

	const list = (table) => {
		return req("GET", table);
	};
	const get = (table, id) => {
		return req("GET", table, id);
	};
	const upsert = (table, data) => {
		if (data && data.id) {
			return req("PUT", table, data);
		}
		return req("POST", table, data);
	};
	const query = (table, query, join) => {
		return req("POST", `${table}/query`, { query, join });
	};
	return {
		list,
		get,
		upsert,
		query,
	};
};

module.exports = createRemoteDB;
