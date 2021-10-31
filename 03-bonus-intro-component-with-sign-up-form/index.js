let inputs = document.querySelectorAll('.input-js');
let button = document.querySelector('.button-js')
let errorMessage = document.querySelectorAll('.error-inp-js');
let form = document.querySelector('.form-js-input');

function showError(input, message,pMessage) {
    input.classList.add('error');
    pMessage.textContent = message;
    pMessage.style.transform = 'translateY(-15px)';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    inputs.forEach(input => {
        const message = input.nextElementSibling;
        if (input.value === '') {
            showError(input, `${input.placeholder} cannot be emtpy`, message);
        }
        else if((input.placeholder ==='Email Address') && !validateEmail(input.value)){
            input.classList.add('error');           
            message.textContent = 'Looks like this is not a email'
        }
    })
})

inputs.forEach(input => {
    input.addEventListener('click', function () {
        errorMessage.textContent = '';
        input.classList.remove('error');
        pMessage = '';
        errorMessage.forEach(e => {
            e.textContent = '';
        })
    })
})


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
