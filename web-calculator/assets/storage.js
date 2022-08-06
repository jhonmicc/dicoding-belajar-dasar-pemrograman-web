const CACHE_KEY = 'calculation_history'

const checkForStorage = () => {
    return typeof (Storage) !== 'undefined'
}

const putHistory = data => {
    if (checkForStorage()) {
        let historyData = null
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = []
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY))
        }
        // add first
        historyData.unshift(data)
        if (historyData.length > 5) {
            // remove last
            historyData.pop()
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData))
    }
}

const showHistory = () => {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY))
    } else {
        return []
    }
}

const renderHistory = () => {
    const historyData = showHistory()
    console.log(historyData);
    let historyList = document.querySelector('#historyList')

    historyList.innerHTML = ''

    for (let history of historyData) {
        let row = document.createElement('tr')
        row.innerHTML = '<td>' + history.firstNumber + '</td>'
        row.innerHTML += '<td>' + history.operator + '</td>'
        row.innerHTML += '<td>' + history.secondNumber + '</td>'
        row.innerHTML += '<td>' + history.result + '</td>'

        historyList.appendChild(row)
    }
}

renderHistory()