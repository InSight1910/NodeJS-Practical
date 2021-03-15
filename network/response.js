exports.success = (req, res, message, statusCode) => {
	let status = statusCode || 200;
	res.status(status).send({
		error: false,
		status: statusCode,
		body: message,
	});
};

exports.error = (req, res, message = "Internal Server Error", statusCode) => {
	let status = statusCode || 500;

	res.status(status).send({
		error: false,
		status: status,
		body: message,
	});
};
