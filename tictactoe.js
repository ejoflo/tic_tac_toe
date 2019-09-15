const playerFactory = (name, marker) => {   // Factory to create players
    const newName = function() {   // New name method
        do {
            this.name = prompt(`What's your name? (Max. 12 characters)`, 'Player');
        } while (this.name === null || this.name === '' || this.name.length > 12);
    };
    return { 
        name: name, 
        marker: marker,
        newName
    };
};

const displayController = (player, index, array) => {
    const displayPlayerInfo = (player) => {
        const randomInfo = function(text) {
            document.querySelector('.randomInfo').textContent = `${text}`;
        };
        const turnInfo = function(player) {
            document.querySelector('.playerInfo').textContent = `Your turn ❮${player.marker}❯ ${player.name}!`;
        };
        const tieInfo = function() {
            document.querySelector('.winnerInfo').textContent = `TIE GAME!`;
        };
        const winnerInfo = function(player) {
            document.querySelector('.winnerInfo').textContent = `❮${player.marker}❯ ${player.name} WINS!`;
        };
        const clearInfo = function() {
            document.querySelector('.playerInfo').textContent = ``;
        };
        const clearWinner = function() {
            document.querySelector('.winnerInfo').textContent = ``;
        };
        return {
            randomInfo,
            turnInfo,
            tieInfo,
            winnerInfo,
            clearWinner,
            clearInfo
        };
    };
    const displayBoard = function(boardArray, tileIndex, player) {
        boardArray.forEach(function(val, index, theArray) {
            document.querySelector(`#tile${index}`).textContent = theArray[index];
        });
    };
    const tieDisplay = function(boardArray) {
        boardArray.forEach(function(val, index) {
            document.querySelector(`#tile${index}`).setAttribute('class', 'winTile');
        });
    };
    const winDisplay = function(winningArray, boardArray) {
        boardArray.forEach(function(val, index) {
            document.querySelector(`#tile${index}`).setAttribute('class', 'tileEnd');
        });
        for (let i = 0; i < winningArray.length; i++) {
            document.querySelector(`#tile${winningArray[i]}`).setAttribute('class', 'winTile');
        }
    };
    return {
        displayPlayerInfo,
        displayBoard,
        tieDisplay,
        winDisplay
    };
};

const gameController = (firstPlayer, secondPlayer) => {
    const gameBoard = {
        board: Array(9).fill(''),
    };
    let currentPlayer = firstPlayer;

    const restartBtn = document.querySelector('#restartBtn');
        restartBtn.addEventListener('click', () => {   // Restart Button
        restartGame();
        });

    const makeMove = function() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            tile.addEventListener('click', (e) => {
                selectTiles(index);
            });
        });
    };

    function selectTiles (index) {
        let winStatus = document.querySelector('.winnerInfo');

        if (winStatus.textContent !== '' || gameBoard.board.indexOf('') < 0) {   // Remove event listeners if player wins or ties
            alert('Press RESTART to play again!')

        }  else if (gameBoard.board[index] === '') {   // Player selects tile
            gameBoard.board[index] = currentPlayer.marker;
            displayController().displayBoard(gameBoard.board, index, currentPlayer);
            checkScore(currentPlayer);
            currentPlayer = swapPlayer(currentPlayer);
            displayController().displayPlayerInfo().turnInfo(currentPlayer);                  

            if (winStatus.textContent !== '' || gameBoard.board.indexOf('') < 0) {   // Clear info text if player wins or ties
                displayController().displayPlayerInfo().clearInfo();
                document.querySelector('#startBtn').style.display = 'none';
                document.querySelector('#restartBtn').style.display = 'inline';
            }
        } else {
            alert ('This tile is taken.');
        }
    }
    
    const checkScore = function(player) {
        let holdArray = [];
        let winningArray = [[0, 1, 2], [0, 3, 6], 
                            [0, 4, 8], [1, 4, 7], 
                            [2, 4, 6], [2, 5, 8],
                            [3, 4, 5], [6, 7, 8]];

        gameBoard.board.forEach((marker, index) => {
            if (gameBoard.board[index] === player.marker) {
                holdArray.push(index);
            }
        });  

        outerCheck: for (i = 0; i < winningArray.length; i++) {
            innerCheck: for (j = 0; j < winningArray.length; j++) {
                if (holdArray.indexOf(winningArray[i][j]) < 0) {
                    break innerCheck;
                } else if (j === 2) {   // Declare the winner
                    displayController().winDisplay(winningArray[i], gameBoard.board);
                    displayController().displayPlayerInfo().winnerInfo(player);
                    break outerCheck;
                }
            }
            if (gameBoard.board.indexOf('') < 0) {   // Check for a tie game
                displayController().displayPlayerInfo().tieInfo();
                displayController().tieDisplay(gameBoard.board);
            }
        }
    };
    
    const swapPlayer = function(player) {
        if (player.marker === 'X') {
            return secondPlayer;
        } else {
            return firstPlayer;
        }
    };
    
    const restartGame = function() {
        gameBoard.board.forEach((val, index, theArray) => {   // Clear the board
            gameBoard.board[index] = '';
            document.querySelector(`#tile${index}`).setAttribute('class', 'tile');
        });        
        displayController().displayBoard(gameBoard.board);
        displayController().displayPlayerInfo().clearInfo();
        displayController().displayPlayerInfo().clearWinner();
        displayController().displayPlayerInfo().turnInfo(currentPlayer);
    };

    return {
        makeMove,
        restartGame
    };
};

const startGame = (() => {
    const playerOne = playerFactory('Player', 'X');
    const playerTwo = playerFactory('Player', 'O');

    displayController().displayPlayerInfo().randomInfo(`Press START to begin`);

    const startListeners = (function() {
        const introText = function() {
            displayController().displayPlayerInfo().randomInfo(``);
        };
        document.querySelector('#startBtn').addEventListener('click', function start() {   // Start Button
            displayController(playerOne, playerTwo).displayPlayerInfo().turnInfo(playerOne);
            gameController(playerOne, playerTwo).makeMove();
            displayController().displayPlayerInfo().randomInfo(`Let's GO!`);
            setTimeout(introText, 2000); 
            document.querySelector('#startBtn').removeEventListener('click', start);
            document.querySelector('#startBtn').style.display = 'none';
            document.querySelector('#restartBtn').style.display = 'inline';
        });
        document.querySelector('#playerOne').addEventListener('click', () => {   // Player X Button  
            playerOne.newName();
            document.querySelector('#playerOne').textContent = `❮X❯ ${playerOne.name}`;
        });
        document.querySelector('#playerTwo').addEventListener('click', () => {   // Player O Button
            playerTwo.newName();
            document.querySelector('#playerTwo').textContent = `❮O❯ ${playerTwo.name}`;
        });
    })();
})();
