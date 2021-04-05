const express = require("express");

const post = require("./components/post/network");
const error = require("../utils/error");

const app = express();

app.use(express.json());
app.use("/api/post", post);
app.use(error);

app.listen(3003, () => console.log("Listening on port ", 3003));
