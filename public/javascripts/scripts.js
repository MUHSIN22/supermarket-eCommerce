let emailAvailable,mobileAvailable;
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
function nameValidation () {
    var name = document.getElementById("name")
    if(name.length === 0){
        name.placeholder = "please enter name";
        return false
    }else{
        return true
    }
}

//sign up validation starts
$("#signup-form").submit((e)=> {
    e.preventDefault();
    if(passwordLengthValidation() && passwordValidation() && nameValidation() && emailAvailable && mobileAvailable){
        document.getElementById("form-validation").value = 'validated';
        $.ajax({
            url : "/signup",
            method : "post",
            data : $("#signup-form").serialize(),
            success : (response) => {
                console.log(response,'res');
                if(response.status){
                    location.href = "/otp-verify";
                }
            }
        })
    }else{
        passwordLengthValidation() ;
        passwordValidation();
        nameValidation();
    }
})
//signup validation ends
//mobile and email validations
$('document').ready(function(){
    $("#mobile").on('blur',function(){
        var mobile = $("#mobile")
        var mobileError = $("#mobile-error")
    $.ajax({
        url : '/check-mobile',
        method : 'post',
        data : {
            mobile : mobile.val()
        },
        success : (response)=>{
            if(!Number.isNaN(parseInt(mobile.val())) && mobile.val().length === 10){
                mobile.css({"boxShadow" : "2px 2px 4px green,-2px -2px 3px green"})
                if(response.available){
                    mobileError.html(response.message)
                    mobileError.css({'color' : '#3eff3e', 'display' : 'block'})
                    $("#mobile").css({'margin-bottom':'0'})
                    mobileAvailable = true;
                }else{
                    $("#mobile").css({'margin-bottom':'0'})
                    mobileError.html(response.message)
                    mobileError.css({ 'display' : 'block'})
                    mobileAvailable = false
                }
            }else{
                mobile.css({"boxShadow" : "2px 2px 4px red,-2px -2px 3px red"})
                mobileError.html('Enter a valid number')
                mobileError.css({'display':'block','color':'red'})
            } 
        }
    })
    })
    $("#email").on('blur',function(){
        var email = $("#email").val()
        console.log(email);
    $.ajax({
        url : '/check-email',
        method : 'post',
        data : {
            email : email
        },
        success : (response)=>{
            if(response.available){
                $("#email-error").html(response.message)
                $("#email-error").css({'color' : '#3eff3e', 'display' : 'block'})
                $("#email").css({'margin-bottom':'0'})
                emailAvailable = true;
            }else{
                $("#email").css({'margin-bottom':'0'})
                $("#email-error").html(response.message)
                $("#email-error").css({'display' : 'block','color':'red'})
                emailAvailable = false
            }
        }
    })
    })

//signup and email validations end

})







