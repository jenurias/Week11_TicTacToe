const tiles = document.querySelectorAll('.tile');
const playerDisplay = document.querySelector('display-player');
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById('strike');
const gamerOverArea = document.getElementById('game-over-area');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('play-again');
playAgain.addEventListener('click', startNewGame);

tiles.forEach((tile) => tile.addEventListener('click', tileClick));

const changePlayer = () => {
    playerDisplay.classList.remove(`player${turn}`);
    turn = turn === 'X' ? 'O' : 'X';
    playerDisplay = innerText = turn;
    playerDisplay.classList.add(`player${turn}`);
}

function tileClick (event) {
    if(gamerOverArea.classList.contains('visible')) {
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText != '') {
        return;
    }
    if(turn === PLAYER_X) {
        tile.innerText = PLAYER_X;
        boardState[tileNumber-1] = PLAYER_X;
        turn = PLAYER_O;
    } else {
        tile.innerText = PLAYER_O;
        boardState[tileNumber-1] = PLAYER_O;
        turn = PLAYER_X;
    }
    checkWinner();
}

function checkWinner() {
    //Check for winner of game
    for(const winningCombination of winningCombinations) {
        const { combo, strikeClass } = winningCombination;
        const tileValue1 = boardState[combo[0]-1]; 
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];

        if(tileValue1 != null && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
    }

    //Check for tie
    const allTilesCompleted = boardState.every((tile) => tile !== null);
    if (allTilesCompleted) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = 'Draw!'
    if(winnerText != null) {
        text = `Winner is ${winnerText}`;
    }
    gamerOverArea.className = 'visible';
    gameOverText.innerText = text;
}

function startNewGame() {
    strike.className = 'strike';
    gamerOverArea.className = 'hidden';
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ''));
    turn = PLAYER_X;
}

const winningCombinations = [
    //Rows
    {combo:[1,2,3], strikeClass: 'strike-row-1'},
    {combo:[4,5,6], strikeClass: 'strike-row-2'},
    {combo:[7,8,9], strikeClass: 'strike-row-3'},
    //Columns
    {combo:[1,4,7], strikeClass: 'stike-column-1'},
    {combo:[2,5,8], strikeClass: 'stike-column-2'},
    {combo:[3,6,9], strikeClass: 'stike-column-3'},
    //Diagonals
    {combo:[1,5,9], strikeClass: 'strike-diagonal-1'},
    {combo:[3,5,7], strikeClass: 'strike-diagonal-2'}
];

