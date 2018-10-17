/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-10-16 11:07:14
 * @modify date 2018-10-16 11:07:14
 * @desc [Testing the functions of userServices]
*/
const sinon = require("sinon");
const user = require("../src/services/userServices");
const assert = require("chai").assert;
const userobj = new user();

/**
 * testing the home function
 */
describe("checking the home method", () => {
    let results = {};
    let homestub;
    beforeEach(() => {
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
    it("should  execute and return user details", () => {
        return userobj.home().then((res) => {

            assert.equal(res, results);
        }).catch((err) => {

            assert.equal(err, false);

        });
    });
    afterEach(() => {
        homestub.restore();
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
    beforeEach(() => {
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
    it("should  execute and return a status object ", () => {
        return userobj.login(ob).then((res) => {
            assert.equal(res.stat, status.stat);
        }).catch((err) => {
            assert.equal(err, false);

        });
    });
    afterEach(() => {
        loginstub.restore();
    });
});

/**
 * testing the register function
 */
describe("checking the register method", () => {
    let ob = {
        name: "balu",
        addr: "djsojiopp",
        usr: "kasp",
        mail: "abhishekmsam54@gmail.com",
        pwd: "balu@1234",
        no: "0987654321",
        role: "u"
    };
    let results = {};
    let selectstub;
    let insertstub;
    let idstub;
    let status = {
        rows: [{ id: 123, stat: 1 }]
    };


    beforeEach(() => {
        results = {
            rows: [{

                count: 0
            }]
        };
        selectstub = sinon.stub(userobj, "countRegister");
        selectstub.resolves(results);
        insertstub = sinon.stub(userobj, "insertRegister");
        insertstub.resolves();
        idstub = sinon.stub(userobj, "getid");
        idstub.resolves(status);

    });
    it("should  execute and return status", () => {
        return userobj.register(ob).then((res) => {
            assert.equal(res.stat, status.rows[0].stat);
        }).catch((err) => {
            assert.equal(err, false);

        });
    });
    afterEach(() => {
        selectstub.restore();
        insertstub.restore();
        idstub.restore();

    });
});

/**
 * testing the edit function
 */
describe("checking the edit method", () => {
    let ob = {
        name: "balu",
        add: "djsojiopp",
        usr: "kasp",
        mail: "abhishekmsam54@gmail.com",
        pass: "balu@1234",
        phone: "0987654321",
        role: "u",
        id: 140
    };
    let results = {};
    let response = "Details updated successfully";
    let updatestub;

    beforeEach(() => {
        results = {
            rows: [{ count: "0" }]
        };
        updatestub = sinon.stub(userobj, "checkEntry");
        updatestub.resolves(results);
    });
    it("should  execute and return status message", () => {
        return userobj.edit(ob).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {
            assert.equal(err, false);

        });
    });
    afterEach(() => {
        updatestub.restore();

    });
});
