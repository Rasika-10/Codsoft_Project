document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    const buttons = Array.from(document.getElementsByClassName('button'));
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let historyInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            
            if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (currentInput === '') return;  // Prevent entering operator without a number
                if (operator && previousInput !== '') {
                    // If there is already an operator and previous input is not empty, calculate the result first
                    const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
                    historyInput = previousInput + ' ' + operator + ' ' + currentInput + ' = ' + result;
                    previousInput = result.toString();
                } else {
                    // If there is no operator or previous input is empty, update previous input and operator
                    operator = value;
                    previousInput = currentInput;
                }
                currentInput = '';
                updateDisplay('0');
                updateHistory(historyInput);
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
            
        });
    });

    equalsButton.addEventListener('click', function() {
        if (operator && previousInput !== '' && currentInput !== '') {
            const result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
            updateDisplay(result);
            currentInput = '';
            previousInput = '';
            historyInput = ''; // Clear history when equals is pressed
            updateHistory('');
        }
    });
    

    clearButton.addEventListener('click', function() {
        currentInput = '';
        operator = null;
        previousInput = '';
        historyInput = '';
        updateDisplay('0');
        updateHistory('');
    });

    function updateDisplay(value) {
        display.innerText = value;
    }

    function updateHistory(value) {
        history.innerText = value;
    }

    function calculate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num1 / num2;
            default:
                return 0;
        }
    }
});