const express = require("express");
const app = express();

const dbConnect = require("./config/dbConnect");

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api", require('./routes/index.routes'));

app.listen(8000, () => {
    console.log("Server running on port 8000");
});