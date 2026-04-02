const Admin = require('../model/admin.model');
const Manager = require('../model/manager.model');
const Employee = require('../model/employee.model');

const jwt = require("jsonwebtoken");

exports.verifyAdminToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.send("No Token");

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const decoded = jwt.verify(token, "Admin01");

        const user = await Admin.findById(decoded.userId);

        if (decoded.role !== "admin") {
            return res.send("Access Denied");
        }

        if (!user) {
            return res.send("Admin not found");
        }

        req.user = user;

        next();
    } catch (err) {
        res.send("Invalid Token");
    }
};

exports.verifyManagerToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.send("No Token");

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const decoded = jwt.verify(token, "Admin01");

        const manager = await Manager.findById(decoded.userId);

        if (decoded.role !== "manager") {
            return res.send("Access Denied");
        }

        if (!manager) {
            return res.send("Manager not found");
        }

        req.user = manager;

        next();
    } catch (err) {
        res.send("Invalid Token");
    }
};

exports.verifyEmployeeToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.send("No Token");

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
        const decoded = jwt.verify(token, "Admin01");

        const employee = await Employee.findById(decoded.userId);

        if (decoded.role !== "employee") {
            return res.send("Access Denied");
        }

        if (!employee) {
            return res.send("Employee not found");
        }

        req.user = employee;

        next();
    } catch (err) {
        res.send("Invalid Token");
    }
};