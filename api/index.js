const express = require("express");
const config = require("../config");
const app = express();

const user = require("./components/user/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");

// Router
app.use(express.json());
app.use("/api/user", user);
app.use("/api/auth", auth);

app.use(errors);

app.listen(config.api.PORT, () => {
	console.log(`listening on port ${config.api.PORT}`);
});
