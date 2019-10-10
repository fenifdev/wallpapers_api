var request = require('supertest');
var app = require('../app')

describe("wallpapers", function (done) {
    this.timeout(10000)
    it("returns an empty array when there is no wallpapers in the db", function(done) {
        request(app).get('/api/wallpapers')
            .expect(200)
            .expect([], done)
    })
})
