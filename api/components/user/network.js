const express = require("express");

const { success, error } = require("../../../network/response");
const { list, get, remove, upsert } = require(".");

const router = express.Router();

// Functions
const getAll = (req, res) => {
	list().then((list) => success(req, res, list, 200));
};

const getById = (req, res) => {
	get(req.params.id)
		.then((user) => success(req, res, user, 200))
		.catch((err) => error(req, res, err.message, 500));
};

const insertUser = (req, res) => {
	const { id, name } = req.body;
	const user = {
		id,
		name,
	};
	upsert(user)
		.then((user) => success(req, res, user, 200))
		.catch((err) => error(req, res, err.message, 500));
};

const deleteUser = (req, res) => {
	const { id } = req.params;
	remove(id)
		.then((rm) => success(req, res, rm, 200))
		.catch((err) => error(req, res, err.message, 500));
};

// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", insertUser);
router.delete("/:id", deleteUser);

module.exports = router;
