/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:12:43
 * @modify date 2018-09-21 10:12:43
 * @desc [description]
*/
const pg = require("pg");
const Promise = require("promise");
class Dao {
    constructor() {
        this.connect = new pg.Pool(
            {
                user: "postgres",
                host: "localhost",
                database: "task",
                password: "freaksintown",
                port: "5432"
            }
        );
    }
    /**
     * Execute Querry
     * @param {*} query 
     */
    execute(query, args) {
        return new Promise((resolve, reject) => {
            let user = this;
            user.connect.query(query, args, (err, res) => {
                if (res) {
                    resolve(res);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
module.exports = Dao;
