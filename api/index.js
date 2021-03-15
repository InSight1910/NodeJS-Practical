const express = require("express");
const config = require("../config");
const app = express();

const user = require("./components/user/network");

// Router
app.use("/api/user", user);
app.use(express.json());

app.listen(config.api.PORT, () => {
	console.log(`listening on port ${config.api.PORT}`);
});
