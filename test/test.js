const sinon = require("sinon");
const admin = require("../src/services/adminServices");
const user = require("../src/services/userServices");
const assert = require("chai").assert;
const adminobj = new admin();
const userobj = new user();

/**
 * Testing the home method of userservices
 */
describe("checking the home method", () => {
    let results = {};
    let homestub;
    before(() => {
        results = {
            rows: [{
                id: 140,
                name: "balu",
                address: "djsojiopp",
                username: "balu",
                email: "abhishekmsam54@gmail.com",
                password: "$2b$10$9PMA8rzwN1s3mISzF0KM9OJOUmovUF7gwwQcKVqQdfV5cnCczjKaC",
                phone_no: "0987654321",
                role: "u"
            }]
        };

        homestub = sinon.stub(userobj, "execute");
        homestub.resolves(results);
    });
    it("should call execute and return user details", () => {
        return userobj.home().then((res) => {

            assert.equal(res, results);
        }).catch((err) => {

            assert.equal(err, false);

        });
    });
    afterEach(function () {
        homestub.restore();
    });
});


/**
 * Testing the admin method of adminServices
 */
describe("checking the admin method", () => {
    let results = {};
    let adminstub;
    before(() => {
        results = {
            rows: [{
                id: 140,
                name: "balu",
                address: "djsojiopp",
                username: "balu",
                email: "abhishekmsam54@gmail.com",
                password: "$2b$10$9PMA8rzwN1s3mISzF0KM9OJOUmovUF7gwwQcKVqQdfV5cnCczjKaC",
                phone_no: "0987654321",
                role: "u"
            }]
        };

        adminstub = sinon.stub(adminobj, "execute");
        adminstub.resolves(results);
    });
    it("should call execute and return all user details", () => {
        return adminobj.admin().then((res) => {

            assert.equal(res, results.rows);
        }).catch((err) => {

            assert.equal(err, false);

        });
    });
    afterEach(function () {
        adminstub.restore();
    });
});


/**
 * testing login function of userservices
 */
describe("checking the login method", () => {
    let ob = {
        username: "balu",
        password: "balu@1234"
    };
    let results = {};
    let loginstub;
    let status = { "id": 140, "stat": 1, "role": "u" };
    before(() => {
        results = {
            rows: [{
                id: 140,
                name: "balu",
                address: "djsojiopp",
                username: "balu",
                email: "abhishekmsam54@gmail.com",
                password: "$2b$10$9PMA8rzwN1s3mISzF0KM9OJOUmovUF7gwwQcKVqQdfV5cnCczjKaC",
                phone_no: "0987654321",
                role: "u"
            }]
        };

        loginstub = sinon.stub(userobj, "execute");
        loginstub.resolves(results);
    });
    it("should call execute and return  user details", () => {
        return userobj.login(ob).then((res) => {
            assert.equal(res.stat, status.stat);
        }).catch((err) => {
            assert.equal(err, false);

        });
    });
    afterEach(function () {
        loginstub.restore();
    });
});