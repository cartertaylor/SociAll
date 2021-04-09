console.log("yooooo");

let firstNameOutput = document.getElementById('validationFirstName');

window.onload = function runKeyUp()
{
    firstNameOutput.onkeyup = function(){
        console.log("NOINONON");
    }
};


