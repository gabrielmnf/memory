const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
// const validadeInput = (event) =>{
//     console.log(event.target.value);
// }

// destructuring
const validateInput = ({ target }) => {
    if (target.value.length > 2) {
      // remove o atributo que desabilita o botão
      button.removeAttribute('disabled');
      return;
    }
    // adiciona o atributo que desabilita o botão
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    // bloqueando o comportamento padrão do submit
    event.preventDefault();
    // acessando e guardando dados no local storage
    localStorage.setItem('player', input.value);
    window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
