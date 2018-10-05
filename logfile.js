/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-10-04 11:27:07
 * @modify date 2018-10-04 11:27:07
 * @desc [description]
*/
const winston = require("winston");
const eventEmitter = require("events");
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "myLog.log" })
    ]
});

class myEmitter extends eventEmitter { }

const myEvent = new myEmitter();

myEvent.on("err", (msg, err) => {
    logger.log({
        level: "error",
        message: msg,
        "exception": err
    });
});

myEvent.on("info", (msg) => {
    
    logger.log({
        level: "info",
        message: msg,

    });
});

myEvent.on("warn", (msg) => {
    logger.log({
        level: "warn",
        message: msg,

    });
});

module.exports = myEvent;