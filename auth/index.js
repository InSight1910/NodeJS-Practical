const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const secret = "secret";
const sign = (data) => {
	const { id, username, password } = data;
	return jwt.sign({ id, username, password }, secret);
};

const getToken = (auth) => {
	if (!auth) {
		throw new Error("No token provided");
	}
	if (auth.indexOf("Bearer ") === -1) {
		throw new Error("Invalid Format");
	}
	const token = auth.replace("Bearer ", "");

	return token;
};
const verify = (token) => {
	return jwt.verify(token, secret);
};

const decodeHeader = (req) => {
	const authorization = req.headers.authorization || "";
	const token = getToken(authorization);
	const decode = verify(token);
	req.user = decode;
	return decode;
};
const check = {
	own: (req, owner) => {
		const token = decodeHeader(req);

		if (token.id !== owner) {
			throw error("You can´t make that", 401);
		}
	},
	logged: (req) => {
		const decode = decodeHeader(req);
	},
};
module.exports = {
	sign,
	check,
};
