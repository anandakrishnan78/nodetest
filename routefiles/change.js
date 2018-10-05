/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:14:28
 * @modify date 2018-09-21 10:14:28
 * @desc [description]
*/
const express = require("express");
const route = express.Router();
const adminServe = require("../services/adminServices");
const logger = require("../logfile");
const service = new adminServe(); 

/**Routed request from Admin page for providing Admin privilege */
route.post("/", (req, resp) => {
    let id = req.body.cid;
    let callchange = service.change(id);
    callchange.then((res) => {
        resp.send(res);
    }).catch((err) => {
        let msg = "error in change function of  adminServices";
        logger.emit("err",msg,err);
    });


});
module.exports = route;