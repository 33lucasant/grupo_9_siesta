const express = require('express');
const path = require('path');
const app = express();
const main = require('./routers/main')
const product = require('./routers/product')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', main);
app.use('/', product);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));