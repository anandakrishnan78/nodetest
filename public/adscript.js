/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 13:48:17
 * @modify date 2018-09-21 13:48:17
 * @desc [description]
*/

var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
var gid = temp[1];
$(document).ready(() => {
    $.post("/admin", { id: gid }, (obj1) => {
       
        var tx = "<table><tr><th>id</th><th>Name</th><th>Address</th><th>Username</th><th>Email</th><th>Password</th><th>Phone_no</th></tr>";
        for (i = 0; i < obj1.len; i++) {
            tx += "<tr><td>" + obj1.data[i].id + "</td><td>" + obj1.data[i].name + "</td><td>" + obj1.data[i].address + "</td><td>" + obj1.data[i].username + "</td><td>" + obj1.data[i].email + "</td><td>" + obj1.data[i].password + "</td><td>" + obj1.data[i].phone_no + "</td></tr>";
        }
        tx += "</table>";
        document.getElementById("details").innerHTML = tx;
    });
});
function logout() {

    var url = "/index.html";
    window.location.href = url;
}
/**Give Admin Privilege */
function change() {
    $(document).ready(() => {
        var id = document.getElementById("pid").value;
        $.post("/change", { cid: id }, (obj) => {
            document.getElementById("res").innerHTML = obj;
        });
    });
}
/**Delete an Account */
function dlt() {
    $(document).ready(() => {
        var id = document.getElementById("pid").value;
        $.post("/del", { cid: id }, (obj) => {
            document.getElementById("res").innerHTML = obj;
        });
    });
}