
var assert = require("assert");
var calc = require("./calc.js");
describe("Calculator Tests", function () {
    it("returns 3+1=4", function (done) {
        assert.equal(calc.add(3, 1), 4);
        done();
    });
    it("returns 2*2=4", function (done) {
        assert.equal(calc.mul(2, 2), 4);
        done();
    });
});