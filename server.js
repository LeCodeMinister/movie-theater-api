const express = require("express");
const app = express();
const {db} = require("./db");

const showRouter = require("./routes/show");
const userRouter = require("./routes/user");

app.use("/shows", showRouter);
app.use("/users", userRouter);

const port = 3000;

app.listen(port, () => {
    db.sync();
    console.log("Listening on port " + port);
})