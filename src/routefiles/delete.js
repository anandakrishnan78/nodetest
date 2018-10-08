/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:14:35
 * @modify date 2018-09-21 10:14:35
 * @desc [description]
*/
const express = require("express");
const adminServe = require("../services/Adminservices");
const logger = require("../../logfile");
const service = new adminServe();
const route = express.Router();


/**
 * Routed delete request from Admin page
 */
route.post("/", (req, resp) => {
    let id = req.body.cid;
    let del = service.delete(id);
    del.then((res) => {
        resp.send(res);
    }).catch((err) => {
        let msg = "error in dlt function of adminServices";
        logger.emit("err",msg,err);
    });
});


module.exports = route;