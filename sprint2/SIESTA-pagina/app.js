const express = require('express');
const path = require('path');
const PORT = 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
});

app.listen(PORT, () => console.log('Servidor funcionando en el puerto', PORT));
