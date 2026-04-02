const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    position: String,
    mobileNo: String,
    profileImage: String,
    role: {
        type: String,
        default: "manager"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Manager", managerSchema);