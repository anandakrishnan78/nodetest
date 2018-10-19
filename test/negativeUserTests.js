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
const expect = require("chai").expect;
const userobj = new user();

/**
 * testing the home function
 */
describe("-ve testing the home method", () => {
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
        homestub.rejects(new Error);
    });
    it("should  execute and return user details", () => {
        return userobj.home(results.rows[0].id).then((res) => {
            assert.equal(res, results);
        }).catch((err) => {
            expect(err).to.be.an("error");

        });
    });
    afterEach(() => {
        homestub.restore();
    });
});

/**
 * testing login function of userservices
 */
describe("-ve testing the login method", () => {
    let ob = {
        username: "balu",
        password: "balu@1234"
    };
    let loginstub;
    let status = { "id": 140, "stat": 1, "role": "u" };
    beforeEach(() => {
        loginstub = sinon.stub(userobj, "execute");
        loginstub.rejects(new Error);
    });
    it("should  execute and return a status object ", () => {
        return userobj.login(ob).then((res) => {
            assert.equal(res.stat, status.stat);
        }).catch((err) => {
            expect(err).to.be.an("error");

        });
    });
    afterEach(() => {
        loginstub.restore();
    });
});

/**
 * testing the register function
 */
describe("-ve testing the register method", () => {
    let ob = {
        name: "balu",
        addr: "djsojiopp",
        usr: "kasp",
        mail: "abhishekmsam54@gmail.com",
        pwd: "balu@1234",
        no: "0987654321",
        role: "u"
    };
    let selectstub;
    let insertstub;
    let idstub;
    let status = {
        rows: [{ id: 123, stat: 1 }]
    };


    beforeEach(() => {
        selectstub = sinon.stub(userobj, "countRegister");
        selectstub.rejects(new Error);
        insertstub = sinon.stub(userobj, "insertRegister");
        insertstub.rejects(new Error);
        idstub = sinon.stub(userobj, "getid");
        idstub.rejects(new Error);

    });
    it("should  execute and return status", () => {
        return userobj.register(ob).then((res) => {
            assert.equal(res.stat, status.rows[0].stat);
        }).catch((err) => {
            expect(err).to.be.an("error");

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
describe("-ve testing the edit method", () => {
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
    let response = "Details updated successfully";
    let updatestub;

    beforeEach(() => {

        updatestub = sinon.stub(userobj, "checkEntry");
        updatestub.rejects(new Error);
    });
    it("should  execute and return status message", () => {
        return userobj.edit(ob).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {
            expect(err).to.be.an("error");
        });
    });
    afterEach(() => {
        updatestub.restore();

    });
});
