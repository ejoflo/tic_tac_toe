// Bugs:
// When changing names and cancelling, player = null
//
//

const playerFactory = (name, marker) => {   // Factory to create players
    const welcomeMsg = () => console.log(`Welcome ${name}!`);
    const yourTurn = () => console.log(`Your turn ${name}!`);
    const newName = function() {   // New name method
        do {
            this.name = prompt(`What's your name?`);
        } while (this.name === '');
    };
    return { 
        name: name, 
        marker: marker,
        welcomeMsg,
        yourTurn,
        newName
    };
};

const gameController = (firstPlayer, secondPlayer) => {
    const gameBoard = {
        board: Array(9).fill(''),
    };

    const playerMove = function(player) {
        let currentPlayer = player;

        document.querySelectorAll('.tile').forEach((tile, index) => {
            tile.addEventListener('click', () => {
                if (gameBoard.board[index] === '') {
                    displayBoard(index, currentPlayer);
                    checkScore(currentPlayer);
                    currentPlayer = swapPlayer(currentPlayer);
                    displayPlayerInfo().turnInfo(currentPlayer);
                } else {
                    alert ('Please choose a different tile.');
                }
            });
        });
    };

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
                } else if (j === 2) {
                    displayPlayerInfo().winnerInfo(player);
                    break outerCheck;
                }
            }
            if (gameBoard.board.indexOf('') < 0) {   // check for a tie
                displayPlayerInfo().tieInfo();
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

    const displayPlayerInfo = (player) => {
        const turnInfo = function(player) {
            document.querySelector('.playerInfo').innerHTML = `${player.name} •${player.marker}• your turn!`;
        };
        
        const tieInfo = function() {
            document.querySelector('.playerInfo').innerHTML = ``;
            document.querySelector('.winnerInfo').innerHTML = `TIE GAME!`;
        };
        
        const winnerInfo = function(player) {
            document.querySelector('.playerInfo').innerHTML = ``;
            document.querySelector('.winnerInfo').innerHTML = `${player.name} •${player.marker}• is the WINNER!`;
        };

        return {
            turnInfo,
            tieInfo,
            winnerInfo
        };
    };

    const displayBoard = function(tileIndex, player) {
        gameBoard.board[tileIndex] = player.marker;
        gameBoard.board.forEach(function(val, index, theArray) {
            document.querySelector(`#tile${index}`).innerHTML = theArray[index];
        });
    };

    return {
        playerMove,
        displayPlayerInfo
    };
};

const startGame = (() => {
    const playerOne = playerFactory('Player', 'X');
    const playerTwo = playerFactory('Player', 'O');

    const chooseStartingPlayer = function() {
        let startingPlayer = '';
        
        while (startingPlayer !== 'X' && startingPlayer !== 'O') {
            startingPlayer = prompt(`Who's going first?`, `X or O`);
            startingPlayer = startingPlayer.toUpperCase();
        }
        
        switch (startingPlayer) {
            case 'X': 
                gameController(playerOne, playerTwo).displayPlayerInfo().turnInfo(playerOne);
                gameController(playerOne, playerTwo).playerMove(playerOne);
                break;
            
            case 'O': 
                gameController(playerOne, playerTwo).displayPlayerInfo().turnInfo(playerTwo);
                gameController(playerOne, playerTwo).playerMove(playerTwo);
                break;
        
            default:
                break;            
            }
        }

    const startListeners = (function() {
        document.querySelector('#startRestart').addEventListener('click', chooseStartingPlayer);
        document.querySelector('#playerOne').addEventListener('click', () => {
            playerOne.newName();
            document.querySelector('#playerOne').innerHTML = `${playerOne.name} •X•`;
        });
        document.querySelector('#playerTwo').addEventListener('click', () => {
            playerTwo.newName();
            document.querySelector('#playerTwo').innerHTML = `${playerTwo.name} •O•`;
        });
    })();
})();

