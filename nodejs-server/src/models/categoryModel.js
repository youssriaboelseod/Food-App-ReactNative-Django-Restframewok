const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name: {type: String, maxlength: 255, required: true},
    created_at: {type: Date, default: Date.now}
}, {collection: 'category'});

module.exports = mongoose.model('category', category);