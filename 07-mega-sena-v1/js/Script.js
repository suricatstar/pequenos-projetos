var state = {board: [],currentGame: [],savedGames: []};

function start(){
    createBoard();
    newGame();

    console.log(state.board);
}

function render(){
    renderBoard();
    renderbutton();
    renderSavedGames();
}

function renderbutton(){
    var divbuttons = document.querySelector('#megasena-buttons');
    divbuttons.innerHTML = '';

    var buttonNewGame = createNewGameButton();
    var buttonRandomGame = createRandomGameButton();
    var buttonsSaveGame = createSaveGameButton();

    divbuttons.appendChild(buttonNewGame);
    divbuttons.appendChild(buttonRandomGame);
    divbuttons.appendChild(buttonsSaveGame);
}

function createRandomGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Jogo aleatório';

    button.addEventListener('click', randomGame);

    return button;
}

function createNewGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Novo jogo';

    button.addEventListener('click', newGame);

    return button;
}
function createSaveGameButton(){
    var button = document.createElement('button')
    button.textContent = 'Salvar jogo';
    button.disabled = !isGameComplete();

    button.addEventListener('click', saveGame);

    return button;
}

function renderSavedGames(){
    var divSavedGames = document.querySelector('#megasena-saved-games');
    divSavedGames.innerHTML = '';

    if(state.savedGames.length === 0){
        divSavedGames.innerHTML = '<p>Nenhum jogo salvo</p>';
    }
    else{
        var ulSavedGames = document.createElement('ul');

        for(var i = 0;i < state.savedGames.length; i++){
        var currentGame = state.savedGames[i];

        var liGame = document.createElement('li');
        liGame.textContent = currentGame.join(', ');

        ulSavedGames.appendChild(liGame);
    }
    

    divSavedGames.appendChild(ulSavedGames);
}
}

function renderBoard(){
    var divBoard = document.querySelector('#megasena-board');
    divBoard.innerHTML = '';

    var ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numbers');

    for(var i = 0;i < state.board.length;i++){
        var currentNumber = state.board[i]

        var liNumber = document.createElement('li')
        liNumber.textContent = currentNumber;
        liNumber.classList.add('number');

        liNumber.addEventListener('click',handleNUmberClick);

        if(isNUmberInGame(currentNumber)){
            liNumber.classList.add('selected-number');
        }

        ulNumbers.appendChild(liNumber)
    }

    divBoard.appendChild(ulNumbers)
}

function handleNUmberClick(event){
    var value = Number(event.currentTarget.textContent);
    if (isNUmberInGame(value)){
        removeNUmberFromGame(value)
    }
    else{
        addNUmberToGame(value); 
    }
    console.log(state.currentGame);
    render();
}

function newGame(){
    resetGame();
    render();
}

function createBoard(){
    state.board = []

    for(var i = 1; i<=60;i++){
        state.board.push(i);
    }
}
function addNUmberToGame(numberToAdd){
    if (numberToAdd<1 || numberToAdd > 60){
        console.error('Número inválido', numberToAdd);
        return;
    }
    if (state.currentGame.length >= 6) {
        console.error('O jogo já está completo.');
        return;
    }

    if (isNUmberInGame(numberToAdd)) {
        console.error('Este número já está no jogo.',numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
}

function removeNUmberFromGame(numberToRemove){
    if (numberToRemove<1 || numberToRemove > 60){
        console.error('Número inválido', numberToRemove);
        return;
    }
    var newGame = [];

    for (var i = 0; i<state.currentGame.length;i++){
        var currentNumber = state.currentGame[i];
        if (currentNumber === numberToRemove){
            continue;
        }
        newGame.push(currentNumber);
    }
    state.currentGame = newGame;
}

function isNUmberInGame(numberToCheck){
    /*if (state.currentGame.includes(numberToCheck)) {
        return true
    }
    return false*/
    return state.currentGame.includes(numberToCheck);
}
function saveGame() {
    if(!isGameComplete()){
        console.error('O jogo não está completo!');
        return;
    }
    state.savedGames.push(state.currentGame);
    newGame();

    console.log(state.savedGames);
}
function isGameComplete(){
    return state.currentGame.length === 6;
}
function resetGame(){
    state.currentGame = [];
}
function randomGame(){
    resetGame();

    while (!isGameComplete()){
        var randomNUmber = Math.ceil(Math.random() * 60);
        addNUmberToGame(randomNUmber);
    }
    console.log(state.currentGame);
    render();
}
start()