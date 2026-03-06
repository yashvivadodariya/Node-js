const express = require('express');
const { dashboardPage, logIn, logInPage, logout, changePasswordPage, changePassword, myProfile } = require('../controller/index.controller');
const routes = express.Router();
const passport = require('passport');

routes.get('/', logInPage);
routes.post('/login', passport.authenticate('local', { failureRedirect: "/" }), logIn);
routes.get('/dashboard', passport.checkAuthenticate, dashboardPage);
routes.get('/change-password', changePasswordPage)
routes.post('/change-password', changePassword)
routes.get('/my-profile', myProfile);
routes.get('/logout', logout);

routes.use('/admin', require('./admin.routes'));
routes.use('/blog', require('./blog.routes'));

module.exports = routes;