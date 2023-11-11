const express= require("express");
const app= express();
const PORT= 3030;
const path = require('path');

app.use('/static', express.static(__dirname + '/public'))
app.listen(PORT, () => console.log("esto fue exitoso"));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/views/home.html'))
});