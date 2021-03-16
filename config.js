module.exports = {
	api: {
		PORT: process.env.PORT || 3000,
	},
	mysql: {
		host: process.env.HOST_DB || "remotemysql.com",
		user: process.env.USER || "6cnTpxSDBK",
		password: process.env.PASSWORD || "uovRX2tlwg",
		database: process.env.DATABASE || "6cnTpxSDBK",
	},
};
