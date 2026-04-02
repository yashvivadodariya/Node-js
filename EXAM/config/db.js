const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect('mongodb+srv://Yashvi:yashvi%40123@cluster0.uooaon0.mongodb.net/API')
        .then(() => console.log("DB is connected"))
        .catch((err) => console.log(err));
};
        
module.exports = dbConnect;