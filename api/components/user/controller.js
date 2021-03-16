const TABLE = "user";
const auth = require("../auth");
const { nanoid } = require("nanoid");

module.exports = (injectedStore) => {
	const store = injectedStore;
	if (!store) {
		store = require("../../../store/dummy");
	}
	const list = () => store.list(TABLE);
	const get = (id) => store.get(TABLE, id);
	const upsert = async (data) => {
		const user = {
			name: data.name,
			username: data.username,
		};
		if (data.id) {
			user.id = data.id;
		} else {
			user.id = nanoid();
		}

		if (data.password || data.username) {
			await auth.upsert({
				id: user.id,
				username: user.username,
				password: data.password,
			});
		}
		return store.upsert(TABLE, user);
	};
	const remove = (id) => store.remove(TABLE, id);
	return {
		list,
		get,
		upsert,
		remove,
	};
};
