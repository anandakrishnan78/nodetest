const { fork } = require("child_process");
const forked = fork("./child.js");

forked.send({ hello: "world" });