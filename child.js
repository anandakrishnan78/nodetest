const nodemailer = require("nodemailer");
const dbconnect = require("./DAO");
const db = new dbconnect();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ananduvkk78@gmail.com",
        pass: "appu779873"
    }
});
/**
 * Scheduling mails to be sent everey 10 seconds
 */
setInterval(() => {
    let emailquery = "select email from log where username=$1";
    let param = ["balu"];
    db.execute(emailquery, param ).then((res) => {
        let mailOptions = {
            from: "ananduvkk78@gmail.com",
            to: res.rows[0].email,
            subject: "new test✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>"
        };
        transporter.sendMail(mailOptions);
    });
}, 10000);
