const express = require('express');
const categoryController = require('./controllers/category.controller');
const route = require('./routers/index');
const db = require('./config/db');
const app = express();

const port = 3000;
db.connect();

route(app);

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});