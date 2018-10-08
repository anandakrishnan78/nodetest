/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:14:21
 * @modify date 2018-09-21 10:14:21
 * @desc [description]
*/

const express = require("express");
const userServe = require("../services/userServices");
const logger = require("../../logfile");
const fs = require("fs");
const route = express.Router();
const service = new userServe();
/**
 * Routed request from home page to update changes 
 */
route.post("/", (req, resp) => {
    let id = req.body.id;
    let imgflag = req.body.imgflag;
    let img = req.body.img;
    let obj = {
        name: req.body.name,
        usr: req.body.user,
        pass: req.body.password,
        add: req.body.address,
        ph: req.body.phone,
        mail: req.body.email,
        id: req.body.id,
        img: req.body.img,
        pflag: req.body.pasflag,
        imgflag: req.body.imgflag
    };
    
    let path = "./public/pic/" + id + ".jpg";
    if (imgflag == "true") {
        let data = img.replace(/^data:image\/\w+;base64,/, "");
        let buf = new Buffer(data, "base64");
        fs.writeFile(path, buf, function () { });
    }
    let calledit = service.edit(obj);
    calledit.then((res) => {
        resp.send(res);
    }).catch((err) => {
        let msg = "error in edit function of userServices";
        logger.emit("err",msg,err);
    });

});
module.exports = route;