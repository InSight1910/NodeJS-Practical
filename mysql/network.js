const express = require("express");
const { success } = require("../network/response");
const { list, get, upsert, query } = require("../store/mysql");

const router = express.Router();

//Internal Functions
const listService = async (req, res, next) => {
	const data = await list(req.params.table);
	success(req, res, data, 200);
};
const getService = async (req, res, next) => {
	const data = await get(req.params.table, req.params.id);
	success(req, res, data, 200);
};
const insertService = async (req, res, next) => {
	const data = await upsert(req.params.table, req.body);
	success(req, res, data, 200);
};
const upsertService = async (req, res, next) => {
	const data = await upsert(req.params.table, req.body);
	success(req, res, data, 200);
};
const queryService = async (req, res, next) => {
	const body = req.body;
	const data = await query(req.params.table, body.query, body.join);
	success(req, res, data, 200);
};

// Routes
router.get("/:table", listService);
router.get("/:table/:id", getService);
router.post("/:table", insertService);
router.post("/:table/query", queryService);
router.put("/:table", upsertService);

module.exports = router;
