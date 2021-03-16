const express = require("express");

const { success, error } = require("../../../network/response");
const { login } = require("./");

const router = express.Router();

// Internal Functions
const loginRoute = (req, res) => {
	const { username, password } = req.body;
	login(username, password)
		.then((token) => {
			success(req, res, token, 200);
		})
		.catch((err) => {
			error(req, res, err.message, 500);
		});
};
// Routes

router.post("/login", loginRoute);

module.exports = router;
