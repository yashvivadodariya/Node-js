const express = require('express');
const { loginManager, profile, updateProfile } = require('../controller/manager.controller');
const { addEmployee, updateEmployee, getEmployees, deleteEmployee } = require('../controller/employee.controller');

const { verifyManagerToken } = require('../middleware/verifyToken');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();

routes.post("/login", uploadImg.none(), loginManager);// done
routes.get("/profile", verifyManagerToken, profile);//done
routes.put("/update-profile", verifyManagerToken, uploadImg.single("profileImage"), updateProfile);//done

routes.post("/add-employee", verifyManagerToken, uploadImg.single("profileImage"), addEmployee);//done
routes.get("/get-all", verifyManagerToken, getEmployees);// done
routes.put("/update-employee/:id", verifyManagerToken, uploadImg.single("profileImage"), updateEmployee);//done
routes.delete("/delete-employee/:id", verifyManagerToken, deleteEmployee);//done

module.exports = routes;