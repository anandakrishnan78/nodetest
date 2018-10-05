/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 13:48:33
 * @modify date 2018-09-21 13:48:33
 * @desc [description]
*/


var parameters = location.search.substring(1).split("&");
var imgString;
var temp = parameters[0].split("=");
var rid = temp[1];
var psFlag = true;
var nsFlag = false;
var asFlag = false;
var pflag = "false";
var imgflag = "false";
/**REQUEST SERVER TO RETRIEVE DATA MATCHING THE SEND ID TO DISPLAY IN HOME PAGE*/
$.post("/home", { id: rid }, (obj) => {
    document.getElementById("name").value = obj.name;
    document.getElementById("user").value = obj.username;
    document.getElementById("pid").value = obj.password;
    document.getElementById("prid").value = obj.password;
    document.getElementById("address").value = obj.address;
    document.getElementById("phone").value = obj.phone_no;
    document.getElementById("eid").value = obj.email;
    $("#blah")
        .attr("src", "./pic/" + obj.id + ".jpg")
        .width(150)
        .height(150);
});
$(document).ready(() => {
    $("#pid").keyup(() => {
        pflag = "true";

        var str1 = document.getElementById("pid").value;
        var str2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        if ((str2.test(str1) == true)) {
            psFlag = true;
            $(".pwd").css("visibility", "hidden");

        }
        else {
            psFlag = false;
            $(".pwd").css("visibility", "visible");


        }
    });
});
function edit()          /**FUNCTION FOR SENDING UPDATED INFO*/ {

    var phFlag = false;
    var esFlag = false;
    var cpFlag;
    $(document).ready(() => {
        var user = document.getElementById("user").value;
        var password = document.getElementById("pid").value;
        var address = document.getElementById("address").value;
        var no = document.getElementById("phone").value;
        var mail = document.getElementById("eid").value;
        var rpassword = document.getElementById("prid").value;
        if (password == rpassword) {
            cpFlag = true;
            $("#reso").css("visibility", "hidden");
        }
        else {
            cpFlag = false;
            $("#reso").css("visibility", "visible");
            $("#response").css("visibility", "hidden");
        }
        /**EMAIL FORMAT VALIDATION*/
        var s2 = document.getElementById("eid").value;
        var t2 = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (t2.test(s2) == true) {
            esFlag = true;

            $(".mail").css("visibility", "hidden");

        }
        else {
            esFlag = false;
            $(".mail").css("visibility", "visible");

        }


        /**PHONE NO FORMAT VALIDATION*/

        var s = document.getElementById("phone").value;
        var t = /^\d{10}$/;
        if (t.test(s) == true) {
            phFlag = true;

            $(".ph").css("visibility", "hidden");

        }
        else {
            phFlag = false;
            $(".ph").css("visibility", "visible");

        }

        /**Name validation*/
        var names = document.getElementById("name").value;
        var reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        if ((reg.test(names) == true)) {
            nsFlag = true;
            $(".name").css("visibility", "hidden");

        }
        else {
            nsFlag = false;
            $(".name").css("visibility", "visible");


        }
        if (address == "") {
            asFlag = false;
            $(".add").css("visibility", "visible");
            $("#response").css("visibility", "hidden");

        }
        else {
            asFlag = true;
            $(".add").css("visibility", "hidden");

        }

        if ((phFlag == true) && (esFlag == true) && (psFlag == true) && (nsFlag == true) && (cpFlag == true) && (asFlag == true)) {
            /**REQUEST TO UPDATE DATABASE WITH NEW INFO*/
            $.post("/edit", { "name": names, "user": user, "password": password, "address": address, "phone": no, "email": mail, "id": rid, "img": imgString, "pasflag": pflag, "imgflag": imgflag }, (obj) => {
                document.getElementById("response").innerHTML = obj;
                $("#response").css("visibility", "visible");
            });
        }


    });
}
/**IMAGE UPLOAD,DISPLAY*/
function image(input) {
    if (input.files && input.files[0]) {
        imgflag = "true";

        var reader = new FileReader();

        reader.onload = function (e) {
            $("#blah")
                .attr("src", e.target.result)
                .width(150)
                .height(150);
        };
        reader.onloadend = function () {

            imgString = this.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function logout() {
    window.location.href = "/index.html";
}