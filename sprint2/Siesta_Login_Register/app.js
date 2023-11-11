const path = require('path');
const express = require('express');
const app = express();

app.use("/static", express.static(__dirname + "/public"));


app.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/login.html'));
});

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/register.html'));
});


app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
});

