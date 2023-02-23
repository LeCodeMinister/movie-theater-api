const express = require("express");
const app = express();
const {sequelize} = require("./db");

const showRouter = require()
const userRouter = require()

const port = 3000;

app.listen(port, () => {
    sequelize.sync();
    console.log("Listening on port " + port);
})