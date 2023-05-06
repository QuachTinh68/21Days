var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var form = document.querySelector('form')


function showError(input, message){
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.add('error')
    small.innerText = message
}


function showSuccess(input){
    let parent = input.parentElement;
    let small = parent.querySelector('small')
    parent.classList.remove('error')
    small.innerText = ''
}


function checkEmptyError(listInput){
    let isEmptyError = false;
    listInput.forEach(input => {
        input.value = input.value.trim()

        if(!input.value){
            isEmptyError = true;
            showError(input, 'Cannot be left blank')
        }else{
            showSuccess(input)
        }
    });

    return isEmptyError
}

function checkEmailError(input){
    const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim()

    let isEmailError = !regexEmail.test(input.value)
    if(regexEmail.test(input.value)){
        showSuccess(input)
    }else{
        showError(input,'Email Invalid')
    }
    return isEmailError
}
function checkLengthError(input, min, max){
    input.value = input.value.trim()

    if(input.value.length < min){
        showError(input, `At least  ${min} characters`)
        return true
    }
    
    if(input.value.length > max){
        showError(input, `Up to ${max} characters`)
        return true
    }

 
    return false
}

function checkMatchPassword(passwordInput, confirmPasswordInput){
    if(passwordInput.value !== confirmPasswordInput.value){
        showError(confirmPasswordInput, 'Password does not match') 
        return true
    }
    return false
}
form.addEventListener('submit', function(e){
    e.preventDefault()
    

    let isEmptyError = checkEmptyError([username, email, password, confirmPassword])
    let isEmailError = checkEmailError(email)
    let isUsernameLengthError = checkLengthError(username, 3 ,10)
    let isPasswordError = checkLengthError(password, 3, 10)
    let isMathCheckError = checkMatchPassword(password, confirmPassword)
})