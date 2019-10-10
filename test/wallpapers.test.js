var request = require('supertest');
var app = require('../app');
var chai = require('chai');

var expect = chai.expect;

Wallpaper = require('../models/wallpaper');

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);
// Connect to Mongoose
mongoose.connect(config.mongourl);
var db = mongoose.connection;

describe("wallpapers", function (done) {
    it("returns an empty array when there is no wallpapers in the db", function(done) {
        Wallpaper.deleteAll(function(err) {
            if(err){
                console.log(err);
            }
        });
        request(app).get('/api/wallpapers')
            .expect(200)
            .expect([], done)
    })

    it("returns a list of wallpapers when there is wallpapers in the db", function(done) {
        Wallpaper.deleteAll(function(err) {
            if(err){
                console.log(err);
            }
        });

        var wallpaper = {title: 'wallpaper'}
        Wallpaper.addWallpaper(wallpaper, function(err, wallpaper) {
            if(err){
                console.log(err);
            }
        });

        request(app).get('/api/wallpapers')
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('array');
              expect(res.body[0].title).to.equal(wallpaper.title);
              done();
            });
    })

    it("returns a wallpaper created", function(done) {
        var wallpaper = {title: 'wallpaper'}
        request(app).post('/api/wallpapers')
            .send(wallpaper)
            .end(function(err, res) {
              expect(res.statusCode).to.equal(200);
              expect(res.body).to.be.an('object');
              expect(res.body.title).to.equal(wallpaper.title);
              done();
            });
    })

    it("returns a wallpaper when the wallpaper exists in the database", function(done) {
        var wallpaper = {title: 'wallpaper'}

        Wallpaper.addWallpaper(wallpaper, function(err, wallpaper) {
            if(err){
                console.log(err);
            }

            request(app).get('/api/wallpapers/' + wallpaper._id)
                .end(function(err, res) {
                  expect(res.statusCode).to.equal(200);
                  expect(res.body).to.be.an('object');
                  expect(res.body.title).to.equal(wallpaper.title);
                  done();
                });
        });
    });

    it("returns a the number of wallpapers deleted when the wallpaper exists in the database", function(done) {
        var wallpaper = {title: 'wallpaper'}

        Wallpaper.addWallpaper(wallpaper, function(err, wallpaper) {
            if(err){
                console.log(err);
            }

            request(app).delete('/api/wallpapers/' + wallpaper._id)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.deletedCount).to.equal(1);
                    done();
                });
        });
    });
})
