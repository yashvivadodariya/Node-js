const express = require('express');
const { logIn, profileAdmin, updateAdmin, registerAdmin } = require('../controller/admin.controller');
const { createManager, getManagers, updateManager, deleteManager } = require('../controller/manager.controller');
const { getEmployees } = require('../controller/employee.controller');
const { verifyAdminToken } = require('../middleware/verifyToken');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();

routes.post('/register', uploadImg.single("profileImage"), registerAdmin);//done
routes.post('/logIn', uploadImg.none(), logIn);//done

routes.get("/profile", verifyAdminToken, profileAdmin);//done
routes.put("/update", verifyAdminToken, uploadImg.single("profileImage"), updateAdmin);//done

routes.post('/add-manager', verifyAdminToken, uploadImg.single("profileImage"), createManager);//done
routes.get('/all-manager', verifyAdminToken, getManagers);//done
routes.put("/update/:id", uploadImg.single("profileImage"), verifyAdminToken, updateManager);//done
routes.delete("/delete/:id", verifyAdminToken, deleteManager);//done

routes.get('/all-employee', verifyAdminToken, getEmployees);

module.exports = routes;