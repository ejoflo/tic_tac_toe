// Bugs:
// When changing names and cancelling, player = null
// Error when cancelling START button
// Clear player turn when win or tie

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
        let winStatus = document.querySelector('.winnerInfo');

        document.querySelectorAll('.tile').forEach((tile, index) => {
            tile.addEventListener('click', function selectTiles() {
                
                console.log(winStatus.innerHTML);
                
                if (winStatus.innerHTML !== '') {
                    console.log('WIN STATUS WORKS!');
                    tile.removeEventListener('.click', selectTiles);
                } else 
                
                if (gameBoard.board.indexOf('') < 0) {
                    tile.removeEventListener('.click', selectTiles);
                } else if (gameBoard.board[index] === '') {
                    displayBoard(index, currentPlayer);
                    checkScore(currentPlayer);
                    currentPlayer = swapPlayer(currentPlayer);
                    displayPlayerInfo().turnInfo(currentPlayer);
                    
                    if (gameBoard.board.indexOf('') < 0) {
                        displayPlayerInfo().clearInfo();
                    }
                } else {
                    alert ('Please choose a different tile.');
                }

                // if (gameBoard.board[index] === '') {
                //     displayBoard(index, currentPlayer);
                //     checkScore(currentPlayer);
                //     currentPlayer = swapPlayer(currentPlayer);
                //     displayPlayerInfo().turnInfo(currentPlayer);
                //     console.log (gameBoard.board.indexOf(''));
                // } else {
                //     alert ('Please choose a different tile.');
                // }
                
                
                
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
                } else if (j === 2) {   // Declare the winner
                    displayPlayerInfo().winnerInfo(player);
                    break outerCheck;
                }
            }
            if (gameBoard.board.indexOf('') < 0) {   // Check for a tie game
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
        const randomInfo = function(text) {
            document.querySelector('.winnerInfo').innerHTML = `${text}`;
        }

        const turnInfo = function(player) {
            document.querySelector('.playerInfo').innerHTML = `Your turn ${player.name} •${player.marker}•!`;
        };
        
        const tieInfo = function() {
            document.querySelector('.winnerInfo').innerHTML = `TIE GAME!`;
        };
        
        const winnerInfo = function(player) {
            document.querySelector('.winnerInfo').innerHTML = `${player.name} •${player.marker}• WINS!`;
        };

        const clearInfo = function() {
            document.querySelector('.playerInfo').innerHTML = ``;
        };

        const clearWinner = function() {
            document.querySelector('.winnerInfo').innerHTML = ``;
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

    const startListeners = (function() {
        const clearText = function() {
            gameController().displayPlayerInfo().randomInfo(``);
        };

        document.querySelector('#startBtn').addEventListener('click', () => {   // Start Button
            gameController(playerOne, playerTwo).displayPlayerInfo().turnInfo(playerOne);
            gameController(playerOne, playerTwo).playerMove(playerOne);
            gameController().displayPlayerInfo().randomInfo(`Let's Begin!`);
            setTimeout(clearText, 3000); 
        });

        document.querySelector('#playerOne').addEventListener('click', () => {   // Player X Button  
            playerOne.newName();
            document.querySelector('#playerOne').innerHTML = `${playerOne.name} •X•`;
        });
        
        document.querySelector('#playerTwo').addEventListener('click', () => {   // Player O Button
            playerTwo.newName();
            document.querySelector('#playerTwo').innerHTML = `${playerTwo.name} •O•`;
        });
    })();
})();

