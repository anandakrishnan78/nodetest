/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:12:02
 * @modify date 2018-09-21 10:12:02
 * @desc [description]
*/

const db = require("../../DAO");
const bcrypt = require("bcrypt");
const logger = require("../../logfile");

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
        let self = this;
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, (err, hash) => {
                    let countquery = "select count(*) from log where username=$1";
                    let userdata = [user];
                    let count = self.countRegister(countquery, userdata);
                    count.then((res) => {
                        
                        if (res.rows[0].count!=0) {
                            // console.log(res.rows[0].count );
                            let status = { stat: 0 };
                            resolve(status);
                            return;
                        }
                        let insertquery = "INSERT INTO log(name,username,address,email,password,phone_no,role) values($1,$2,$3,$4,$5,$6,$7)";
                        let param = [name, user, address, mail, hash, no, role];
                        return self.insertRegister(insertquery, param);
                    }).then(() => {
                        let msg = "successfull registration";
                        logger.emit("info", msg);
                        let idquery = "select id from log where username=$1";
                        let username = user;
                        return self.getid(idquery, [username]);
                    }).then((res) => {
                        console.log(res.rows[0]);
                        let data = { id: res.rows[0].id, stat: 1 };
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            });

        });
    }
    /**
     * Authentication Service
     * @param {*} ob 
     */
    login(ob) {
        let user = ob.user;
        let password = ob.password;
        return new Promise((resolve, reject) => {
            let countquery = "select * from log where username=$1";
            let username = user;
            let count = this.execute(countquery, [username]);
            count.then((res) => {
                if (res.rows.length <= 0) {
                    let status = { "stat": -1, "info": "account doesn't exist" };
                    logger.emit("info", status.info);
                    resolve(status);
                    return;
                }
                bcrypt.compare(password, res.rows[0].password, function (err, resp) {

                    if (!resp) {
                        let status = { "stat": 0, "info": "fields not entered or password mistaken" };
                        logger.emit("info", status.info);

                        resolve(status);
                        return;
                    }

                    let status = { "id": res.rows[0].id, "stat": 1, "role": res.rows[0].role };

                    resolve(status);
                });
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
        let self = this;
        let salt = 10;

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, function (err, hashp) {
                let query = "update log set name=$1,address=$2,phone_no=$3,email=$4 where id=$5";
                let params = [name, address, phone, mail, id];
                self.updateInfo(query, params);

                if (pflag == "true") {
                    let updatepass = "update log set password=$1 where id=$2";
                    let param = [hashp, id];
                    self.updatePassword(updatepass, param);
                }
                let countquery = "select count(*) from log where username=$1 and id!=$2";
                let data = [user, id];
                let result = self.checkEntry(countquery, data);
                result.then((res) => {
                   
                    let count = res.rows[0].count;
                    if ((count > 0) || (user == "")) {
                        let response = "This username cannot be used but any  other changes have been recorded";
                        resolve(response);
                        return;
                    }
                    let updateuser = "update log set username=$1 where id=$2";
                    self.updateUsername(updateuser, data);
                    let msg = "successfull updation";
                    logger.emit("info", msg);
                    let response = "Details updated successfully";
                    resolve(response);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * db select query execution unit for  register function
     * @param {*} query 
     * @param {*} param 
     */
    countRegister(query, param) {
        let count = this.execute(query, param);
        return count;

    }
    /**
     * db insert query execution unit for  register function
     * @param {*} query 
     * @param {*} param 
     */
    insertRegister(query, param) {
        let entry = this.execute(query, param);
        return entry;
    }
    /**
     * db select id  query execution unit for  register function
     * @param {*} query 
     * @param {*} param 
     */
    getid(query, param) {
        let id = this.execute(query, param);
        return id;
    }
    /**
     * db update query execution unit for  edit function
     * @param {*} query 
     * @param {*} param 
     */
    updateInfo(query, param) {
        this.execute(query, param);
    }
    /**
     * db passwordupdation query execution unit for  edit  function
     * @param {*} query 
     * @param {*} param 
     */
    updatePassword(query, param) {
        this.execute(query, param);
    }
    /**
     * db execution unit of select querry for edit function
     * @param {*} query 
     * @param {*} param 
     */
    checkEntry(query, param) {
        let entry = this.execute(query, param);
        return entry;
    }
    /**
     * db execution for username updation of edit function
     * @param {*} query 
     * @param {*} param 
     */
    updateUsername(query, param) {
        this.execute(query, param);

    }
}
module.exports = userServices;
