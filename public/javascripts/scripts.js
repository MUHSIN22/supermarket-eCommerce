// const formValidation;
console.log();
function passwordVisibilityChange(){
    console.log('entered to function')
    var password = document.getElementById("password")
    var visible = document.getElementsByClassName("visible-icon")
    var invisible = document.getElementsByClassName("invisible-icon")
    if(password.type === 'password'){
        password.type = 'text';
        visible[0].style.display = "none";
        invisible[0].style.display = "block"
    }else{
        password.type = 'password';
        invisible[0].style.display = "none";
        visible[0].style.display = "block"
    }
}
function passwordLengthValidation(){
    var password = document.getElementById("password")
    var lessLength = document.getElementById("password-character")
    var condition =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(password.value.length >= 8 && password.value.match(condition)){
        password.style.boxShadow = "2px 2px 4px green,-2px -2px 3px green"
        lessLength.style.display = "none"
        return true;
    }else{
        password.style.boxShadow = "2px 2px 4px red,-2px -2px 3px red"
        lessLength.style.display = "block"
        return false 
    }
}
function passwordValidation() {
    var password = document.getElementById("password")
    var confirmPassword = document.getElementById("confirm-password")
    var notMatchPassword = document.getElementById("not-match-password")
    if(password.value === confirmPassword.value){
        confirmPassword.style.boxShadow = "2px 2px 4px green,-2px -2px 3px green"
        notMatchPassword.style.display = "none";
        return true
    }else{
        confirmPassword.style.boxShadow = "2px 2px 4px red,-2px -2px 3px red"
        notMatchPassword.style.display = "block";
        return false    
    }
}
function mobileValidate(){
    var mobile = document.getElementById("mobile")
    var mobileError = document.getElementById("mobile-error")
    console.log(parseInt(mobile.value));
     if(!Number.isNaN(parseInt(mobile.value)) && mobile.value.length === 10){
        mobile.style.boxShadow = "2px 2px 4px green,-2px -2px 3px green";
        mobileError.style.display = "none";
        return true
    }
    else{
        mobile.style.boxShadow = "2px 2px 4px red,-2px -2px 3px red";
        mobileError.style.display = "block";
        return false
    }
}
function nameValidation () {
    var name = document.getElementById("name")
    if(name.length === 0){
        name.placeholder = "please enter name";
        return false
    }else{
        return true
    }
}
$("#signup-form").submit((e)=> {
    e.preventDefault();
    if(passwordLengthValidation() && passwordValidation() && mobileValidate() && nameValidation()){
        document.getElementById("form-validation").value = 'validated';
        $.ajax({
            url : "/signup",
            method : "post",
            data : $("#signup-form").serialize(),
            success : (response) => {
                console.log('success');
            }
        })
    }else{
        console.log('in else');
        passwordLengthValidation() ;
        passwordValidation();
        mobileValidate();
        nameValidation();
    }
})