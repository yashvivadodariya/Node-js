const Admin = require('../model/admin.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
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

        const adminExists = await Admin.findOne({ email });

        if (adminExists) {
            return res.json({
                message: "Admin already exists. Please login."
            });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            firstName,
            lastName,
            email,
            password: hashPass,
            gender,
            position,
            mobileNo,
            profileImage,
            role: "admin"
        });

        res.json({
            message: "Admin Registered Successfully",
            admin
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.json({ message: "Wrong password" });

        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            "Admin01",
            { expiresIn: "1h" }
        );

        res.json({ token, message: "Admin logged in successfully" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.profileAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id);
        res.json({ admin });
    } catch (err) {
        res.json({ message: err.message });
    }
};


exports.updateAdmin = async (req, res) => {
    try {
        let updateData = { ...req.body };
        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const updated = await Admin.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );

        res.json({
            message: "Admin updated successfully",
            admin: updated
        });

    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
};


exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.user._id);

        res.json({ message: "Admin Deleted" });
    } catch (err) {
        res.json({ message: err.message });
    }
};