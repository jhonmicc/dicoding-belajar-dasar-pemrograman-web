const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false
}

const updateDisplay = () => {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber
}

const clearCalculator = () => {
    calculator.displayNumber = '0'
    calculator.operator = null
    calculator.firstNumber = null
    calculator.isWaitForSecondNumber = false
}

const inputDigit = digit => {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit
    } else {
        calculator.displayNumber += digit
    }
}

const inverseNumber = () => {
    if (calculator.displayNumber === '0') return
    calculator.displayNumber = calculator.displayNumber * -1
}

const handleOperator = operator => {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator
        calculator.isWaitForSecondNumber = true
        calculator.firstNumber = calculator.displayNumber
        // reset the display number
        calculator.displayNumber = '0'
    } else {
        alert('Operator sudah ditetapkan!')
    }
}

const performCalculation = () => {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator!')
        return
    }

    let result = 0
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber)
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history)
    calculator.displayNumber = result
    renderHistory()
}

// mendapatkan semua selector dengan className button
const buttons = document.querySelectorAll('.button')
for (const button of buttons) {
    button.addEventListener('click', (e) => {
        const target = e.target
        // contains => suatu method yg mengembalikan nilai boolean
        if (target.classList.contains('clear')) {
            clearCalculator()
            updateDisplay()
            return
        }

        if (target.classList.contains('negative')) {
            inverseNumber()
            updateDisplay()
            return
        }

        if (target.classList.contains('equals')) {
            performCalculation()
            updateDisplay()
            return
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            return
        }

        inputDigit(target.innerText)
        updateDisplay()
    })
}