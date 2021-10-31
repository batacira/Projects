let input = document.querySelector('.js-input');
let button = document.querySelector('.js-button');
let error = document.querySelector('.error-message');
let body = document.querySelector('body');

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function email(e) {
    e.preventDefault();
    if (input.value === '') {
        error.textContent = 'Oops! Please add your email';
    }
    else if (!validateEmail(input.value)) {
        error.textContent = 'Oops! Please check your email';
    }
    input.value = '';
}
input.addEventListener('click', function () {
    error.textContent = '';
})


button.addEventListener('click', email);


