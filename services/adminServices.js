/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:13:29
 * @modify date 2018-09-21 10:13:29
 * @desc [description]
*/

const db = require("../DAO");
const logger = require("../logfile");


/**
 * Service class
 */
class adminServices extends db {

    /**
     *Alloting Admin Privilege 
     * @param {*} ob 
     */
    change(ob) {
        let role = "a";
        let id = ob;
        return new Promise((resolve, reject) => {

            let countquery = "select count(*) from log where id=$1";
            let param = id;
            let counts = this.execute(countquery, [param]);
            counts.then((res) => {
                let count = res.rows[0].count;
                if (count > 0) {
                    let updatequery = "update log set role=$1  where id=$2";
                    let data = [role, id];
                    let result = this.execute(updatequery, data);
                    result.then(() => {
                        let logmsg = "Admin privilege provided ";
                        logger.emit("info", logmsg);
                        let msg = "Admin privilege provided";
                        resolve(msg);
                    }).catch((err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                }
                else {
                    let msg = "no such record";
                    resolve(msg);
                }
            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });

        });

    }
    /**
     * View Admin Page
     * @param {*} ob 
     */
    admin(ob) {
        let role = "a";
        let id = ob;
        return new Promise((resolve, reject) => {

            let listquery = "select * from log where id!=$1 and role!=$2";
            let param = [id, role];
            this.execute(listquery, param).then((res) => {
                resolve(res.rows);
            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });

        });
    }
    /**
     * Account Deletion Service
     * @param {*} ob 
     */
    delete(ob) {
        let id = ob;
        return new Promise((resolve, reject) => {

            let countquery = "select count(*) from log where id=$1";
            let param = id;
            let result = this.execute(countquery, [param]);
            result.then((res) => {
                let count = res.rows[0].count;
                if (count > 0) {
                    let deletequery = "delete from log where id=$1";
                    let result = this.execute(deletequery, [param]);
                    result.then(() => {
                        let logmsg = "Account deletion ";
                        logger.emit("info", logmsg);
                        let response = "Account Deleted";
                        resolve(response);
                    }).catch((err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                }
                else {
                    let response = "no such user";
                    resolve(response);
                }

            }).catch((err) => {
                if (err) {
                    reject(err);
                }
            });

        });
    }
}
module.exports = adminServices;

