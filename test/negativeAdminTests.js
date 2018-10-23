/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-10-16 11:07:05
 * @modify date 2018-10-16 11:07:05
 * @desc [Testing the functions of adminServices]
*/
const sinon = require("sinon");
const admin = require("../src/services/adminServices");
const assert = require("chai").assert;
const expect = require("chai").expect;
const adminobj = new admin();
/**
 * testing admin function
 */
describe("-ve testing the admin method", () => {
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
        adminstub.rejects(new Error);
    });
    it("should  execute and return all user details", () => {
        return adminobj.admin().then((res) => {

            assert.equal(res, results.rows);
        }).catch((err) => {

            expect(err).to.be.an("error");
        });
    });
    afterEach(() => {
        adminstub.restore();
    });
});


/**
 * testing change function
 */
describe("-ve testing the change method", () => {
    let id = 155;
    let response = "Admin privilege";
    let selectstub;
    let updatestub;
    beforeEach(() => {

        selectstub = sinon.stub(adminobj, "select");
        selectstub.rejects(new Error);
        updatestub = sinon.stub(adminobj, "updateRole");
        updatestub.rejects(new Error);
    });
    it("should  execute and return all user details", () => {
        return adminobj.change(id).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {
            expect(err).to.be.an("error");
        });
    });
    afterEach(() => {
        selectstub.restore();
        updatestub.restore();
    });
});

/**
 * testing delete function
 */
describe("-ve testing the delete method", () => {
    let id = 159;
    let response = "Account Deleted";
    let selectstub;
    let deletestub;
    beforeEach(() => {
        selectstub = sinon.stub(adminobj, "select");
        selectstub.rejects(new Error);
        deletestub = sinon.stub(adminobj, "remove");
        deletestub.rejects(new Error);
    });
    it("should  execute and return response message", () => {
        return adminobj.delete(id).then((res) => {
            assert.equal(res, response);
        }).catch((err) => {

            expect(err).to.be.an("error");
        });
    });
    afterEach(() => {
        selectstub.restore();
        deletestub.restore();
    });
});