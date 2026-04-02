const express = require("express");
const app = express();

const dbConnect = require("./config/db");

app.use(express.json());

dbConnect();

app.use("/user", require("./routes/User.Routes"));
app.use("/api", require("./routes/task.Routes"));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});