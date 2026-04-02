const Manager = require('../model/manager.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendWelcomeMail = require("../utils/sendMail");


exports.loginManager = async (req, res) => {
    try {
        const { email, password } = req.body;
        const manager = await Manager.findOne({
            email,
            isDelete: false
        });

        if (!manager) {
            return res.json({ message: "Manager not found" });
        }

        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) {
            return res.json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            {
                userId: manager._id, role: manager.role
            },
            "Admin01",
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.profile = async (req, res) => {
    try {
        res.json({
            message: "My Profile",
            user: req.user
        });
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const user = await Manager.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );

        res.json({
            message: "My Profile update success",
            user
        });

    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
};


exports.createManager = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            gender,
            position,
            mobileNo
        } = req.body;

        let profileImage = req.body.profileImage;
        if (req.file) {
            profileImage = req.file.filename;
        }

        const exist = await Manager.findOne({ email });
        if (exist) {
            return res.json({ message: "Manager already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const manager = await Manager.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            gender,
            position,
            mobileNo,
            profileImage,
            role: "manager"
        });

        await sendWelcomeMail(email, firstName, password, "Manager");

        res.json({
            message: "Manager Added Successfully. Credentials sent to email.",
            manager
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.getManagers = async (req, res) => {
    try {
        const managers = await Manager.find({ isDelete: false });

        res.json({ managers });
    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.updateManager = async (req, res) => {
    try {
        const { id } = req.params;

        const manager = await Manager.findById(id);

        if (!manager || manager.isDelete === true) {
            return res.json({ message: "Manager is Missing" });
        }

        let updateData = { ...req.body };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const updatedManager = await Manager.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.json({
            message: "Manager Updated",
            manager: updatedManager
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.deleteManager = async (req, res) => {
    try {
        const { id } = req.params;

        const manager = await Manager.findById(id);

        if (!manager || manager.isDelete === true) {
            return res.json({ message: "Manager is Missing" });
        }

        await Manager.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true }
        );

        res.json({ message: "Manager Deleted" });

    } catch (err) {
        res.json({ message: err.message });
    }
};