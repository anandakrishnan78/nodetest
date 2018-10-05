/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 13:50:22
 * @modify date 2018-09-21 13:50:22
 * @desc [description]
*/

var phFlag = false;
var esFlag = false;
var psFlag = false;
var nsFlag = false;
var asFlag;
var sFlag;

function ValidatePass() {

    $(document).ready(() => {


        /**Email Validation*/
        var email = document.getElementById("eid").value;
        var t2 = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (t2.test(email) == true) {
            esFlag = true;
            $(".idd").css("visibility", "hidden");

        }
        else {
            esFlag = false;
            $(".idd").css("visibility", "visible");

        }

        /**Phone Number Validation*/
        var phone = document.getElementById("no").value;
        var t = /^\d{10}$/;
        if (t.test(phone) == true) {
            phFlag = true;
            $(".ph").css("visibility", "hidden");

        }
        else {
            phFlag = false;
            $(".ph").css("visibility", "visible");

        }

        /**password Validation*/
        var password = document.getElementById("pid").value;
        var str2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if ((str2.test(password) == true)) {
            psFlag = true;
            $(".pwd").css("visibility", "hidden");

        }
        else {
            psFlag = false;
            $(".pwd").css("visibility", "visible");


        }

        /**Name validation*/
        var name = document.getElementById("name").value;
        var reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if ((reg.test(name) == true)) {
            nsFlag = true;
            $(".name").css("visibility", "hidden");

        }
        else {
            nsFlag = false;
            $(".name").css("visibility", "visible");


        }
        var address = document.getElementById("Add").value;
        if (address == "") {
            asFlag = false;
        }
        else {
            asFlag = true;
        }

        /**FINAL VALIDATION AND REDIRECTING TO HOME  PAGE*/
        if ((phFlag == true) && (esFlag == true) && (psFlag == true) && (nsFlag == true) && (asFlag == true)) {

            var names = document.getElementById("name").value;
            var add = document.getElementById("Add").value;
            var usr = document.getElementById("uname").value;
            var mail = document.getElementById("eid").value;
            var pwd = document.getElementById("pid").value;
            var ph = document.getElementById("no").value;
            var cpwd = document.getElementById("prid").value;
            if (cpwd == pwd) {
                sFlag = true;
                $("#reso").css("visibility", "hidden");
            }
            else {
                sFlag = false;
                $("#reso").css("visibility", "visible");
            }
            $(document).ready(function () {
                if (sFlag == true) {
                    $.post("/client", { name: names, Address: add, User: usr, Email: mail, Password: pwd, Phone: ph }, (obj) => {
                        if (obj.stat == 1) {

                            var url = "/home.html?id=" + obj.id;
                            window.location.href = url;
                        }
                        else {


                            document.getElementById("demo").innerHTML = obj.info;
                        }
                    });
                }
            });
        }
        else {
            document.getElementById("demo").innerHTML = "SOME FIELDS NOT ENTERED";

        }

    });
}