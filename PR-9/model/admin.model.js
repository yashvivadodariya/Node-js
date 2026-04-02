const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
        default: "admin"
    },
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Admin", adminSchema);