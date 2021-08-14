const mongoose = require('mongoose');

connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/food-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to datebase successfully!');
    } catch(error) {
        console.log(error);
    }
}

module.exports = { connect }