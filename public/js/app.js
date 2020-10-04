console.log('JavaScript client side is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/weather?address=${search.value}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageTwo.textContent = '';
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = '';
                messageTwo.textContent = data.forecast;
            }
        })
        .catch((err) => console.log(`Error: ${err}.`));

    document.querySelector('input').value = '';
})