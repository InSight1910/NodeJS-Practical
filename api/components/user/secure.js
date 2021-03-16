const { check } = require("../../../auth");

const checkAuth = (action) => {
	const middleware = (req, res, next) => {
		switch (action) {
			case "update":
				const owner = req.body.id;
				check.own(req, owner);
				next();
				break;
			default:
				next();
		}
	};
	return middleware;
};
module.exports = checkAuth;
