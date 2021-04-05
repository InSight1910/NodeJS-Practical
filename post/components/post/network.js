const express = require("express");

const { success } = require("../../../network/response");
const { list, get, upsert } = require("./index");

const router = express.Router();

//Internal Functions
const listPost = (req, res, next) => {
	list()
		.then((data) => {
			success(req, res, data, 200);
		})
		.catch(next);
};
const getPost = (req, res, next) => {
	get(req.params.id)
		.then((data) => {
			success(req, res, data, 200);
		})
		.catch(next);
};
const upsertPost = (req, res, next) => {
	upsert(req.body)
		.then((data) => {
			return success(req, res, data, 200);
		})
		.catch(next);
};
const updatePost = (req, res, next) => {
	upsert(req.body)
		.then((data) => {
			return success(req, res, data, 200);
		})
		.catch(next);
};

//Routes
router.get("/", listPost);
router.get("/:id", getPost);
router.post("/", upsertPost);
router.put("/", updatePost);

module.exports = router;
