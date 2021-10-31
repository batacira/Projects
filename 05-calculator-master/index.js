const body = document.querySelector('body');
const slider = document.querySelector('.slider');
const container = document.querySelector('.container');
const screen1 = document.querySelector('.screen');
const screenNum = document.querySelector('.screen-num');
const head = document.querySelector('.head');
const gridView = document.querySelector('.grid-view');
const del = document.querySelector('.del');
const reset = document.querySelector('.reset');
const equally = document.querySelector('.equally');
const number = document.querySelectorAll('.number');
const calculationArr = document.querySelectorAll('.calculation');

const array = [body,slider, container, screen1, screenNum, head, gridView, del, reset, equally];

// value from slider is string
slider.onchange = function () {
    if (slider.value == 1) {
        array.forEach(el => {
            el.classList.add('theme-1');
            el.classList.remove('theme-2');
            el.classList.remove('theme-3');
        })
    }
    if (slider.value == 2) {
        array.forEach(el => {
            el.classList.add('theme-2');
            el.classList.remove('theme-1');
            el.classList.remove('theme-3');
        })
    }
    if (slider.value == 3) {
        array.forEach(el => {
            el.classList.add('theme-3');
            el.classList.remove('theme-1');
            el.classList.remove('theme-2');
        })
    }
}

    // **************

let num1 = '';
let num2 = '';
let result = null;
let calculate = '';
let hasDot = false;


number.forEach(el => {
        el.addEventListener('click', function (e) {
            if(e.target.textContent === '.' && !hasDot) {
                hasDot = true;
            }
            else if(e.target.textContent === '.' && hasDot) {
                return;
            }
            num2 += e.target.textContent;
            screenNum.textContent = num2; 
        })
    })

calculationArr.forEach(el =>{
    el.addEventListener('click', (e) => {
        if(!num2){
            return;
        } 
        hasDot = false;
        const operation = e.target.textContent;
        if(num1 && num2 && calculate) {
            doOper();
        }
        else {
            result = parseFloat(num2);
        }

        clear();
        calculate = operation;
    })
})

    const clear = () => {
        num1 += num2;
        screenNum.textContent = '';
        num2 = '';
    }

const doOper = () => {
    if(calculate === 'x'){
        result = parseFloat(result) * parseFloat(num2);
    } 
    if(calculate === '/'){
        result = parseFloat(result) / parseFloat(num2);
    } 
    if(calculate === '+'){
        result = parseFloat(result) + parseFloat(num2);
    } 
    if(calculate === '-'){
        result = parseFloat(result) - parseFloat(num2);
    } 
}

equally.addEventListener('click', function(e) {
    if (!num1 && !num2) return;   
    doOper();
    result += '';
    screenNum.textContent = `${result.includes('.') ? (+result).toFixed(2) : result}`;
    num1 = '';
    num2 = screenNum.textContent;
});

reset.addEventListener('click', function(e) {
    screenNum.textContent = '0';
    num1 = '';
    num2 = '';
    result = '';
});

del.addEventListener('click', function(e) {
    const newValue = [...screenNum.textContent].slice(0, -1).join('');
    screenNum.textContent = newValue;
    num2 = screenNum.textContent;
});