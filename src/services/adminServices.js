/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:13:29
 * @modify date 2018-09-21 10:13:29
 * @desc [description]
*/

const db = require("../../DAO");
const logger = require("../../logfile");


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
            let counts = this.select(countquery, [param]);
            counts.then((res) => {
                let count = res.rows[0].count;
                if (count == 0) {
                    let msg = "no such record";
                    resolve(msg);
                    return;
                }
                let updatequery = "update log set role=$1  where id=$2";
                let data = [role, id];
                return this.updateRole(updatequery, data);
            }).then(() => {
                let logmsg = "Admin privilege";
                logger.emit("info", logmsg);
                resolve(logmsg);
            }).catch((err) => {
                reject(err);
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
                reject(err);
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
            let result = this.select(countquery, [param]);
            result.then((res) => {
                let count = res.rows[0].count;
                if (count == 0) {
                    let response = "no such user";
                    resolve(response);
                    return;
                }
                let deletequery = "delete from log where id=$1";
                return this.remove(deletequery, [param]);
            }).then(() => {
                let logmsg = "Account deletion ";
                logger.emit("info", logmsg);
                let response = "Account Deleted";
                resolve(response);
            }).catch((err) => {
                reject(err);
            });

        });
    }
    /**
     * select query execution unit for the file
     * @param {*} query 
     * @param {*} param 
     */
    select(query, param) {
        let entry = this.execute(query, param);
        return entry;
    }
    /**
     * db execution unit for updating role
     * @param {*} query 
     * @param {*} param 
     */
    updateRole(query, param) {
        let admin = this.execute(query, param);
        return admin;
    }
    /**
     * db execution unit for delete query
     * @param {*} query 
     * @param {*} param 
     */
    remove(query, param) {
        let account = this.execute(query, param);
        return account;
    }
}
module.exports = adminServices;

