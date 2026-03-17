const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.addAdminPage = async (req, res) => {
    try {
        return res.render("admin/addAdmin");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : "";
        let hashPass = await bcrypt.hash(req.body.password, 10);
        let admin = await Admin.create({
            ...req.body,
            password: hashPass,
            profileImage: imgPath
        });
        return res.redirect("/admin/view-admin");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.viewAllAdmin = async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.render("admin/viewAdmin", { admins });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);

        if (!admin) {
            console.log("Admin not found..");
            return res.redirect('/');
        }

        if (admin.profileImage) {
            let imgpath = path.join(__dirname, "..", admin.profileImage);
            try {
                if (fs.existsSync(imgpath)) {
                    fs.unlinkSync(imgpath);
                }
            } catch (error) {
                console.log('Something is missing');
            }
        }

        await Admin.findByIdAndDelete(id);
        return res.redirect('/admin/view-admin');
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    } 
}

exports.editAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        return res.render('admin/editAdmin', { admin });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;

        const admin = await Admin.findById(id);
        if (!admin) {
            console.log("Admin not found");
            return res.redirect('/admin/view-admin');
        }

        const updateData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            mobileNo: req.body.mobileNo
        };

        if (req.file) {

            if (admin.profileImage) {
                const imgPath = path.join(__dirname, "..", admin.profileImage);
                try {
                    fs.unlinkSync(imgPath);
                } catch (err) {
                    console.log(err);
                }
            }

            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        if (req.body.password?.trim()) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        await Admin.findByIdAndUpdate(id, updateData, { new: true });

        return res.redirect('/admin/view-admin');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};