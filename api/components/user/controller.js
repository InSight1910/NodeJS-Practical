const TABLE = "user";

module.exports = (injectedStore) => {
	const store = injectedStore;
	if (!store) {
		store = require("../../../store/dummy");
	}
	const list = () => store.list(TABLE);
	const get = (id) => store.get(TABLE, id);
	const upsert = (data) => store.upsert(TABLE, data);
	const remove = (id) => store.remove(TABLE, id);
	return {
		list,
		get,
		upsert,
		remove,
	};
};
