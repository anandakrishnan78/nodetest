/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:13:53
 * @modify date 2018-09-21 10:13:53
 * @desc [description]
*/

const express = require("express");
const route = express.Router();
const userServe = require("../services/userServices");
const logger = require("../../logfile");
const service = new userServe();
/**
 * Routed request from registration page
 */
route.post("/", (req, resp) => {
    let data = {
        name: req.body.name,
        addr: req.body.Address,
        usr: req.body.User,
        mail: req.body.Email,
        pwd: req.body.Password,
        no: req.body.Phone,
        role: "u"
    };

    let callregister = service.register(data);
    callregister.then((res) => {
       
        if (res.stat > 0) {
            let status = { "stat": 1, "id": res.id };
            resp.send(status);
        }
        else {
            let status = { "stat": 0, "info": "this username cannot be used" };
            resp.send(status);
        }
    }).catch((err) => {
        let msg = "error in register function of userServices";
        logger.emit("err",msg,err);
    });
});
module.exports = route;