
console.log('javascript ');



const cotacoesForm = document.querySelector('form')
const mainMessanger = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')
cotacoesForm.addEventListener('submit', (event) => {
    
    mainMessanger.innerText = '';
    price.innerHTML = '';
    price_open.innerHTML = '';
    day_high.innerHTML = '';
    day_low.innerHTML = '';

    mainMessanger.innerText = 'Buscando ...'
    event.preventDefault();
    const ativo =  document.querySelector('input').value
    
    if(!ativo) {
        mainMessanger.innerText = 'O ativo deve ser informado'
        return;
    }
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                price.innerHtml = `Alguma coisa deu errado ${data.error.message} código ${data.error.code}`
            } else {
                mainMessanger.innerText = `Symbol: ${data.symbol}`;
                price.innerHTML = `Price: ${data.price}`;
                price_open.innerHTML = `Price Open:  ${data.price_open}`;
                day_high.innerHTML = `Price Day: ${data.day_high}`;
                day_low.innerHTML = `Price Low: ${data.day_low}`;
            }
            console.log(data);
        })
    });
} )