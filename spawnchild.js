const { spawn } = require("child_process");
const bat = spawn("cmd.exe",["/c","D:\\nodetest\\filelist.bat"]);

bat.stdout.on("data", (data) => {
    console.log(unescape(data));
});