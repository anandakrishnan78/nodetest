const sinon = require("sinon");
const admin = require("../src/services/adminServices");
const assert = require("chai").assert;
const adminobj = new admin();



/**
 * Testing the admin method of adminServices
 */
describe("checking the admin method", () => {
    let results = {};
    let adminstub;
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

        adminstub = sinon.stub(adminobj, "execute");
        adminstub.resolves(results);
    });
    it("should  execute and return all user details", () => {
        return adminobj.admin().then((res) => {

            assert.equal(res, results.rows);
        }).catch((err) => {

            assert.equal(err, false);
        });
    });
    afterEach(() => {
        adminstub.restore();
    });
});


/** testing change function */
describe("checking the change method", () => {
    let id = 155;
    let response = "Admin privilege";
    let selectstub;
    let updatestub;
    beforeEach(() => {
        let results = {
            rows: [{
                count: 1
            }]
        };
        selectstub = sinon.stub(adminobj, "select");
        selectstub.resolves(results);
        updatestub = sinon.stub(adminobj, "updateRole");
        updatestub.resolves();
    });
    it("should  execute and return all user details", () => {
        return adminobj.change(id).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {
            assert.equal(err, false);
        });
    });
    afterEach(() => {
        selectstub.restore();
        updatestub.restore();
    });
});

/** testing delete function */

describe("checking the delete method", () => {
    let id = 159;
    let response = "Account Deleted";
    let selectstub;
    let deletestub;
    beforeEach(() => {
        let results = {
            rows: [{
                count: 1
            }]

        };
        selectstub = sinon.stub(adminobj, "select");
        selectstub.resolves(results);
        deletestub = sinon.stub(adminobj, "remove");
        deletestub.resolves();
    });
    it("should  execute and return response message", () => {
        return adminobj.delete(id).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {

            assert.equal(err, false);

        });
    });
    afterEach(() => {
        selectstub.restore();
        deletestub.restore();
    });
});