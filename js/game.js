const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'casca',
    'guts',
    'griffith',
    'cascaeguts',
    'cascaegriffith',
    'gutsegriffith',
    'gutserickert',
    'gutsezodd',
    'judeauepippin',
    'maodedeus'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () =>{

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        //se acertar
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    }else{ 
        //se errar
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
        
            firstCard = '';
            secondCard = '';
        
        }, 500);   
    }
}

const revealCard = ({target}) => {
    
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    // se for vazio nao clicou na primeira carta
    if(firstCard === ''){
        //revela a carta
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    }
    
    checkCards();
    
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

// carrega o jogo
const loadGame = () => {
    //pega os elementos do array de personagens e espalha 2 vezes dentro do duplicate
    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    // forEach percorre cada elemento do array  
    duplicateCharacters.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () =>{
    
    // incrementa a cada 1seg
    this.loop = setInterval(() => {
        // o '+' tenta converter a string pra um número
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () =>{
    
    const playerName = localStorage.getItem('player');

    spanPlayer.innerHTML = playerName;

    startTimer();
    loadGame();
}

