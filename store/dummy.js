const db = {
	user: [{ id: 1, name: "Vicente" }],
};

const list = async (table) => db[table];
const get = async (table, id) => {
	const col = await list(table);
	return col.filter((item) => item.id == id)[0] || null;
};
const upsert = async (table, data) => {
	if (!db[table]) {
		db[table] = [];
	}
	db[table].push(data);
};
const remove = async (table, id) => true;
const query = async (table, quer) => {
	const col = await list(table);
	let keys = Object.keys(quer);
	return col.filter((item) => item[keys[0]] == quer[keys[0]]) || null;
};
module.exports = {
	list,
	get,
	upsert,
	remove,
	query,
};
