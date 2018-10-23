const sinon = require("sinon");
const admin = require("./adminServices");
const user = require("./userServices");
const dao = require("../../DAO");
const assert = require('chai").assert;
const adminobj = new admin();
const userobj = new user();


describe("checking the home method", function () {
    let results = {};
    let stub;
    before(function () {
        results = {
           
            id: 140,
            name: "balu",
            address: "djsojiopp",
            username: "balu",
            email: "abhishekmsam54@gmail.com",
            password: "$2b$10$9PMA8rzwN1s3mISzF0KM9OJOUmovUF7gwwQcKVqQdfV5cnCczjKaC",
            phone_no: "0987654321",
            role: "u"

        };

        stub = sinon.stub(userobj, "execute");
        stub.rejects(new Error);
    });
    it("should call execute and return user details", () => {
        return userobj.home().then((res) => {
            assert.equal(res, results);
        }).catch((err) => {
            assert.equal(err, false);

        });
    });
});