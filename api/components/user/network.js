const express = require("express");

const secure = require("./secure");
const { success, error } = require("../../../network/response");
const { list, get, remove, upsert, follow, following } = require(".");

const router = express.Router();

// Functions
const getAll = (req, res, next) => {
	list()
		.then((list) => success(req, res, list, 200))
		.catch(next);
};

const getById = (req, res, next) => {
	get(req.params.id)
		.then((user) => success(req, res, user, 200))
		.catch(next);
};

const insertUser = (req, res, next) => {
	upsert(req.body)
		.then((user) => success(req, res, user, 200))
		.catch(next);
};

const deleteUser = (req, res, next) => {
	const { id } = req.params;
	remove(id)
		.then((rm) => success(req, res, rm, 200))
		.catch(next);
};

const followUser = (req, res, next) => {
	follow(req.user.id, req.params.id)
		.then((data) => {
			success(req, res, data, 201);
		})
		.catch(next);
};

const followingUser = (req, res, next) =>
	following(req.params.id)
		.then((data) => success(req, res, data, 201))
		.catch(next);
// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/follow/:id", secure("follow"), followUser);
router.post("/:id/following", followingUser);
router.post("/", insertUser);
router.put("/", secure("update"), insertUser);
router.delete("/:id", deleteUser);

module.exports = router;
