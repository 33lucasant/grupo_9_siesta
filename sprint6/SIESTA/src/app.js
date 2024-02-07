const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const app = express();
const main = require('./routes/main');
const users = require('./routes/users');
const products = require('./routes/products');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');


app.use(session({
    secret: "It's a secret",
    resave: false,
    saveUninitialized: false
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/', main);
app.use('/user', users);
app.use('/products', products);

app.use((req, res, next) => {
    res.status(404).render('error404')
})

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));