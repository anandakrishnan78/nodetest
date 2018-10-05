/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:12:02
 * @modify date 2018-09-21 10:12:02
 * @desc [description]
*/

const db = require("../DAO");
const bcrypt = require("bcrypt");
const logger = require("../logfile");

/**
 * service class
 */
class userServices extends db {
    /**
     * Registration Service
     * @param {*} ob 
     */
    register(ob) {
        let name = ob.name;
        let address = ob.addr;
        let user = ob.usr;
        let mail = ob.mail;
        let password = ob.pwd;
        let no = ob.no;
        let role = ob.role;
        let object = this;
        return new Promise((resolve, reject) => {
            let countquery = "select count(*) from log where username=$1";
            let userdata = [user];
            let count = this.execute(countquery, [userdata]);
            count.then((res) => {
                if (res.rows[0].count != 0) {
                    let status = { stat: 0 };
                    resolve(status);
                    return;
                }
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, (err, hash) => {
                        let insertquery = "INSERT INTO log(name,username,address,email,password,phone_no,role) values($1,$2,$3,$4,$5,$6,$7)";
                        let param = [name, user, address, mail, hash, no, role];
                        let results = object.execute(insertquery, param);

                        results.then(() => {
                            let msg = "successfull registration";
                            logger.emit("info", msg);
                            let idquery = "select id from log where username=$1";
                            let username = user;
                            object.execute(idquery, [username]).then((res) => {
                                let data = { id: res.rows[0].id, stat: 1 };
                                resolve(data);
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * Authentication Service
     * @param {*} ob 
     */
    login(ob) {
        let object = this;
        let user = ob.user;
        let password = ob.password;
        return new Promise((resolve, reject) => {

            let countquery = "select count(*) from log where username=$1";
            let username = user;
            let count = this.execute(countquery, [username]);
            count.then((res) => {
                let msg = "successfull username search in database";
                logger.emit("info", msg);
                if (res.rows[0].count == 0) {
                    let status = { "stat": -1, "info": "account doesn't exist" };
                    resolve(status);
                }
                else {
                    let passwordquery = "select password from log where username=$1";
                    let pwd = this.execute(passwordquery, [username]);
                    pwd.then((res2) => {
                        let msg = "successfull password authentication";
                        logger.emit("info", msg);
                        let pass = res2.rows[0].password;
                        bcrypt.compare(password, pass, function (err, resp) {

                            if (resp == false) {
                                let status = { "stat": 0, "info": "fields not entered or password mistaken" };
                                resolve(status);
                            }
                            else {

                                let dataquery = "select id,role from log where username=$1";
                                let data = object.execute(dataquery, [username]);
                                data.then((res) => {

                                    let status = { "id": res.rows[0].id, "stat": 1, "role": res.rows[0].role };
                                    resolve(status);
                                }).catch((err) => {

                                    reject(err);

                                });
                            }
                        });
                    }).catch((err) => {

                        reject(err);

                    });
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * View Home Page
     * @param {*} ob 
     */
    home(ob) {
        let id = ob;
        return new Promise((resolve, reject) => {

            let listquery = "select * from log where id=$1";
            let param = id;
            let list = this.execute(listquery, [param]);
            list.then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);

            });
        });
    }
    /**
     * Update Changes in home page
     * @param {*} obj 
     */
    edit(obj) {
        let name = obj.name;
        let user = obj.usr;
        let password = obj.pass;
        let address = obj.add;
        let phone = obj.ph;
        let mail = obj.mail;
        let id = obj.id;
        let pflag = obj.pflag;
        let object = this;
        let salt = 10;

        return new Promise((resolve, reject) => {

            let query = "update log set name=$1,address=$2,phone_no=$3,email=$4 where id=$5";
            let params = [name, address, phone, mail, id];

            this.execute(query, params);

            if (pflag == "true") {

                bcrypt.hash(password, salt, function (err, hashp) {

                    let updatepass = "update log set password=$1 where id=$2";
                    let param = [hashp, id];
                    object.execute(updatepass, param);
                });

            }
            let countquery = "select count(*) from log where username=$1 and id!=$2";
            let data = [user, id];
            let result = this.execute(countquery, data);
            result.then((res) => {
                let count = res.rows[0].count;
                if ((count > 0) || (user == "")) {
                    let response = "This username cannot be used but any  other changes have been recorded";
                    resolve(response);
                }
                else {
                    let updateuser = "update log set username=$1 where id=$2";
                    this.execute(updateuser, data);
                    let msg = "successfull updation";
                    logger.emit("info", msg);
                    let response = "Details updated successfully";
                    resolve(response);
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
module.exports = userServices;


