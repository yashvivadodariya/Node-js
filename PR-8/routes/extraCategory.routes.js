const express = require('express');
const { 
addExtraCategoryPage, 
addExtraCategory, 
viewExtraCategory, 
deleteExtraCategory, 
editExtraCategory, 
updateExtraCategory, 
getExtracategory,
subCategories
} = require('../controller/extraCategory.controller');

const routes = express.Router();

routes.get('/add-extracategory', addExtraCategoryPage);
routes.post('/add-extracategory', addExtraCategory);
routes.get('/view-extracategory', viewExtraCategory);
routes.get('/delete-extracategory/:id', deleteExtraCategory);
routes.get('/edit-extracategory/:id', editExtraCategory);
routes.post('/update-extracategory/:id', updateExtraCategory);

routes.get('/subcategory', subCategories);
routes.get('/getExtracategory', getExtracategory);

module.exports = routes;