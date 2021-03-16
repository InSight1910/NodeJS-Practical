const TABLE = "auth";
const { sign } = require("../../../auth");
const bcrypt = require("bcrypt");
module.exports = (injectedStore) => {
	const store = injectedStore;
	if (!store) {
		store = require("../../../store/dummy");
	}
	const login = async (username, password) => {
		const data = await store.query(TABLE, { username });

		return bcrypt.compare(password, data.password).then((equals) => {
			if (equals) {
				return sign(data);
			}
		});
	};
	const upsert = async (data) => {
		const authData = {
			id: data.id,
		};
		if (data.username) {
			authData.username = data.username;
		}
		if (data.password) {
			authData.password = await bcrypt.hash(data.password, 10);
		}
		return store.upsert(TABLE, authData);
	};
	return {
		upsert,
		login,
	};
};
