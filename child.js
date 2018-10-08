const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ananduvkk78@gmail.com",
        pass: "appu779873"
    }
});
let mailOptions = {
    from: "ananduvkk78@gmail.com", 
    to: "abhishekmsam54@gmail.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: "<b>Hello world?</b>" 
};
transporter.sendMail(mailOptions, () => {
});