/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:14:09
 * @modify date 2018-09-21 10:14:09
 * @desc [description]
*/

const express = require("express");
const userServe = require("../services/userServices");
const logger = require("../logfile");
const service = new userServe();
const route = express.Router();


/**
 * Routed request from home page to display details of user
 */
route.post("/", (req, resp) => {
    let id = req.body.id;
    let callhome = service.home(id);
    callhome.then((res) => {
        let row = res.rows[0];
        resp.send(row);

    }).catch((err) => {
        let msg = "error in home function of  userServices";
        logger.emit("err",msg,err);
    });
});
module.exports = route;