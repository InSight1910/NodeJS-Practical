const TABLE = "post";
module.exports = (injectedStore) => {
	let store = injectedStore;
	if (!store) store = require("../../../store/mysql");

	const list = () => {
		return store.list(TABLE);
	};
	const get = (id) => {
		return store.get(TABLE, id);
	};
	const upsert = (data) => {
		return store.upsert(TABLE, data);
	};

	return {
		list,
		get,
		upsert,
	};
};
