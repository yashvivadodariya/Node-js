const mongoose = require('mongoose');

const extraCategorySchema = mongoose.Schema({
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    extraCategoryName: String
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema);