var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.get('/', (req, res) => {
    res.send('Please use /api/wallpapers');
});

app.listen(3000);
console.log('Running on port 3000...');
