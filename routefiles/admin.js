/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:14:58
 * @modify date 2018-09-21 10:14:58
 * @desc [description]
*/
const express = require("express");
const adminServe = require("../services/adminServices");
const logger = require("../logfile");
const service = new adminServe();
const route = express.Router();

/**
 * Routed request from Admin page to display details of all users
 */
route.post("/", (req, resp) => {
    let id = req.body.id;
    let calladmin = service.admin(id);
    calladmin.then((res) => {
        let count = res.length;
        let obj = { data: res, len: count };
        resp.send(obj);
    }).catch((err) => {
        let msg = "error in admin function of adminServices";
        logger.emit("err",msg,err);
    });
});

module.exports = route;