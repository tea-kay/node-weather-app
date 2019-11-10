const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messsageOne = document.querySelector('#message-1')
const messsageTwo = document.querySelector('#message-2')

// messsageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messsageOne.textContent = 'Loading...'
    messsageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messsageOne.textContent = data.error
            } else {
                messsageOne.textContent = data.location
                messsageTwo.textContent = data.forecast
            }
        })
    })

})