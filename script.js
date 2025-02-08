const elements = document.querySelector('.elements');
const input = document.querySelector('#input');
let flag = 0;
let number = 0;
let calc = 0;
let sign;
let history = {};


function handleInput(value) {
    if (value === 'C') {
        localStorage.clear();

        input.value = '';
        return;
    }

    if (isNaN(+value)) {
        if (input.value !== '') {
            if (value !== '=' && flag === 0) {
                number = input.value;
                sign = value;
                flag = 1;
                input.value = '';
            } else if (flag) {
                flag = 0;
                calculate(+number, sign, +input.value);
                sign = '';
                number = 0;
            }
        }
    } else {
        input.value += value;
    }
}


elements.addEventListener('click', (ev) => {
    if(calc) {
        input.value = ''
        calc = 0;
    }
    if (ev.target.tagName === 'BUTTON') {
        handleInput(ev.target.textContent);
    }
});


document.addEventListener('keydown', (ev) => {
    if(calc) {
        input.value = '';
        calc = 0;
    }

    const allowedKeys = ['+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape'];
    
    ev.preventDefault();

    if (!isNaN(+ev.key)) {
        input.value += ev.key;
    } else if (allowedKeys.includes(ev.key)) {
        if (ev.key === 'Enter') {
            handleInput('=');
        } else if (ev.key === 'Backspace') {
            input.value = input.value.slice(0, -1);
        } else if (ev.key === 'Escape') {
            handleInput('C');
        } else {
            handleInput(ev.key);
        }
    }
});


function calculate(num1, sign, num2) {
    calc = 1;
    input.value = eval(`${num1}${sign}${num2}`);

    localStorage.setItem(`history${localStorage.length}`, input.value)
}   
