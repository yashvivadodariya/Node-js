const Employee = require('../model/employee.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendWelcomeMail = require("../utils/sendMail");


exports.loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({
            email,
            isDelete: false
        });

        if (!employee) {
            return res.json({ message: "Employee not found" });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: employee._id, role: employee.role },
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

exports.profileEmployee = async (req, res) => {
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

exports.updateProfileEmployee = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const user = await Employee.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );

        res.json({
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
};

exports.addEmployee = async (req, res) => {
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

        const exist = await Employee.findOne({ email });

        if (exist) {
            return res.json({ message: "Employee already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const employee = await Employee.create({
            firstName,
            lastName,
            email,
            password: hashPass,
            gender,
            position,
            mobileNo,
            profileImage,
            role: "employee"
        });

        await sendWelcomeMail(email, firstName, password, "Employee");

        res.json({
            message: "Employee Added Successfully. Credentials sent to email.",
            employee
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({
            isDelete: false
        });

        res.json({
            message: "All Employees",
            employees
        });

    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("=== UPDATE EMPLOYEE ===");
        console.log("Employee ID:", id);
        console.log("req.body:", JSON.stringify(req.body));
        console.log("req.file:", req.file);

        const employee = await Employee.findById(id);

        if (!employee || employee.isDelete === true) {
            return res.json({ message: "Employee not found" });
        }

        let updateData = { ...req.body };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        console.log("Final updateData:", JSON.stringify(updateData));

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        console.log("Updated result:", JSON.stringify(updatedEmployee));

        res.json({
            message: "Employee Updated",
            employee: updatedEmployee
        });

    } catch (err) {
        console.log("Update error:", err);
        res.json({ message: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee || employee.isDelete === true) {
            return res.json({ message: "Employee not found" });
        }

        await Employee.findByIdAndUpdate(
            id,
            { isDelete: true },
            { new: true }
        );

        res.json({ message: "Employee Deleted" });

    } catch (err) {
        res.json({ message: err.message });
    }
};