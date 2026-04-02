const express = require('express');
const routes = express.Router();

const { loginEmployee, profileEmployee, updateProfileEmployee } = require('../controller/employee.controller');
const { verifyEmployeeToken } = require('../middleware/verifyToken');
const uploadImg = require('../middleware/uploadImg');

routes.post("/login", uploadImg.none(), loginEmployee);// done
routes.get("/profile", verifyEmployeeToken, profileEmployee);//done
routes.put("/update-profile", verifyEmployeeToken, uploadImg.single("profileImage"), updateProfileEmployee);//done

module.exports = routes;