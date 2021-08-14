const bodyParser = require('body-parser');
const Category = require('../models/categoryModel');

class CategoryController {

    // [GET] /category 
    index = (request, response) => {
        Category.find({}, (err, categories) => {
            if(!err) {
                response.status(200).send(categories);
            } else {
                response.status(404).send('Not found!');
            }
        });
    }

    // [GET] /category/:id
    detail = (request, response) => {
        const name = request.params.id;
        Category.findOne({_id: name}, (err, category) => {
            if(!err) {
                response.status(200).send(category);
            } else {
                response.status(404).send('Category not found');
            }
        })
    }

    // [GET] /category/:id/products
    productDetail = (request, response) => {
        response.status(200).send(request.body);
    }
}

module.exports = new CategoryController;