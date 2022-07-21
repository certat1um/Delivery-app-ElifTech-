const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const storeRoutes = require('./routes/store');
const cartRoutes = require('./routes/cart');

const server = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

server.engine('hbs', hbs.engine);
server.set('view engine', 'hbs');
server.set('views', 'views');

server.use(express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({extended: true}));

server.use(storeRoutes);
server.use(cartRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});