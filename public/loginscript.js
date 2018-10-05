/**
 * @author Anandakrishnan
 * @email ananduvkk78@gmail.com
 * @create date 2018-09-21 13:49:44
 * @modify date 2018-09-21 13:49:44
 * @desc [description]
*/
function ValidatePass() {
    

    /**RECIEVING DATA FROM FORM ELEMENTS*/
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pid").value;


    /**CHECK FOR USERNAME AND PASSWORD MATCH BY SENDING DATA TO SERVER*/
    $(document).ready(() => {
        $.post("/login", { username: name, password: pass }, (obj) => {
          
            if (obj.stat > 0) {
                
                if (obj.role == "u") {
                    var url = "/home.html?id=" + obj.id;
                    window.location.href = url;
                }
                else {
                    
                    url = "/admin.html?id=" + obj.id;
                    window.location.href = url;
                }
            }
            else {
                document.getElementById("demo").innerHTML = obj.info;

            }
        }

        );
    });



}