/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 10:13:18
 * @modify date 2018-09-21 10:13:18
 * @desc [description]
*/

const express = require("express");
const bodyParser = require("body-parser");
const clients = require("./src/routefiles/register");
const login = require("./src/routefiles/login");
const change = require("./src/routefiles/change");
const edit = require("./src/routefiles/edit");
const home = require("./src/routefiles/home");
const del = require("./src/routefiles/delete");
const admin = require("./src/routefiles/admin");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**  Routing requests */
app.use("/client", clients);
app.use("/login", login);
app.use("/home", home);
app.use("/change", change);
app.use("/edit", edit);
app.use("/del", del);
app.use("/admin", admin);


app.listen(3002, () => {
});

