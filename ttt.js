const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick() {
    const cellIndex = this.getAttribute('data-index');
    
    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (gameState.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    } else {
        statusText.textContent = 'Draw!';
        gameActive = false;
    }
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] !== '') {
            return true;
        }
    }
    return false;
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('player-x', 'player-o');
    });
    statusText.textContent = `Player X's Turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
