var request = require('supertest');
var app = require('../app')

describe("homepage", function (done) {
    it("welcomes the user", function(done) {
        request(app).get('/')
            .expect(200)
            .expect(/api/, done)
    })
})
