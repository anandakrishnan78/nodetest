/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:13:40
 * @modify date 2018-09-21 10:13:40
 * @desc [description]
*/

const express = require("express");
const logger = require("../../logfile");
const userServe = require("../services/userServices");
const route = express.Router();
const service = new userServe();

/**
 *Routed  Request from Login page 
 */
route.post("/", (req, resp) => {
    let userData = {
        "user": req.body.username,
        "password": req.body.password
    };
    let logincall = service.login(userData);
    logincall.then((res) => {
        if (res.stat == -1) {
            resp.send(res);
        }
        else if (res.stat == 0) {

            resp.send(res);
        }
        else {
            let resdata = { "id": res.id, "role": res.role, "stat": 1 };
            resp.send(resdata);
        }
    }).catch((err) => {
        let msg = "error in login function of userServices";
        logger.emit("err",msg,err);

    });
});
module.exports = route;