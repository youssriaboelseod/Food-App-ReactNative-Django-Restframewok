const categoryRoute = require('./category.route');

route = (app) => {
    app.use('/api/category/', categoryRoute);
}

module.exports = route;