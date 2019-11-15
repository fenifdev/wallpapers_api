var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);

app.use(bodyParser.json());

Wallpaper = require('./models/wallpaper');

// Connect to Mongoose
mongoose.connect(config.mongourl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected!1'))
.catch(err => { console.log(Error, err.message);});
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Please use /api/wallpapers');
});

app.get('/api/wallpapers', (req, res) => {
    Wallpaper.getWallpapers((err, wallpapers) => {
        if(err){
            throw err;
        }
        res.json(wallpapers);
    });
});

app.post('/api/wallpapers', (req, res) => {
    var wallpaper = req.body;

    Wallpaper.addWallpaper(wallpaper, (err, wallpaper) => {
        if(err){
            throw err;
        }
        res.json(wallpaper);
    });
});

app.get('/api/wallpapers/:_id', (req, res) => {
    Wallpaper.getWallpaperById(req.params._id, (err, wallpaper) => {
        if(err){
            throw err;
        }
        res.json(wallpaper);
    });
});

app.delete('/api/wallpapers/:_id', (req, res) => {
    var id = req.params._id;
    Wallpaper.removeWallpaper(id, (err, wallpaper) => {
        if(err){
            throw err;
        }
        res.json(wallpaper);
    });
});

if(process.env.NODE_ENV=='test') {
    module.exports = app;
} else {
    app.listen(3000);
    console.log('Running on port 3000...');
}
