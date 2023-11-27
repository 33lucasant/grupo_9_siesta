const express = require('express');
const path = require('path');
const app = express();
const main = require('./routers/main');
const products = require('./routers/products');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', main);
app.use('/products', products);

app.use((req, res, next) => {
    res.status(404).render('error404')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));