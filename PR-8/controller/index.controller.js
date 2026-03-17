const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');

exports.logInPage = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard")
        } else
            return res.render("logIn");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.logIn = async (req, res) => {
    try {
        return res.redirect("/dashboard");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
}

exports.dashboardPage = async (req, res) => {
    try {
        return res.render("dashboard");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};


exports.myProfile = async (req, res) => {
    try {
        return res.render("myProfile", { user: req.user });
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.changePasswordPage = async (req, res) => {
    try {
        return res.render("Changepassword");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { curPassword, newPassword, conPassword } = req.body;
        const user = req.user;

        let verPassword = await bcrypt.compare(curPassword, user.password);
        if (!verPassword) {
            return res.redirect("/change-password");
        }
        if (curPassword == newPassword) {
            return res.redirect("/change-password");
        }
        if (newPassword != conPassword) {
            return res.redirect("/change-password");
        }

        let hashPassword = await bcrypt.hash(newPassword, 10);
        await Admin.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
        return res.redirect("/");
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err, data) => {
            if (err)
                console.log(err)
            else {
                return res.redirect("/");
            }
        })
    } catch (error) {
        console.log(error)
        return res.redirect("/");
    }
};