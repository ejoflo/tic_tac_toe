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
                console.log(currentPlayer);
                if (gameBoard.board[index] === '') {
                    displayBoard(index, currentPlayer); 
                    currentPlayer = swapPlayer(currentPlayer);
                } else if (gameBoard.board[index] === currentPlayer.marker || gameBoard.board[index] !== '') {
                    alert ('Please choose a different tile.');
                }
    

                console.log(`player marker: ${currentPlayer.marker}`);            
                console.log(`board array: ${gameBoard.board} index: ${index}`);
                // checkBoard();
            });
        });
    };

    const swapPlayer = function(player) {
        if (player.marker === 'X') {
            return secondPlayer;
        } else {
            return firstPlayer;
        }
        // (marker === 'X') ? playerMove(secondPlayer) : playerMove(firstPlayer);
    };

    const displayBoard = function(tileIndex, player) {
        // while (gameBoard.board[tileIndex] !== '' && gameBoard.board[tileIndex] !== player.marker) {
        //     alert('Please pick another tile.');
        // }
        
        gameBoard.board[tileIndex] = player.marker;
        // (gameBoard.board[tileIndex] === '') ? gameBoard.board[tileIndex] = player.marker : alert('Please pick another tile.');
        // gameBoard.board[tileIndex] = player.marker; 
        gameBoard.board.forEach(function(val, index, theArray) {
            document.querySelector(`#tile${index}`).innerHTML = theArray[index];
        });
    };

    return {
        playerMove
    };
};

const startGame = () => {
    const playerOne = playerFactory('Player 1', 'X');
    playerOne.welcomeMsg();

    const playerTwo = playerFactory('Player 2', 'O');
    playerTwo.welcomeMsg();

    const chooseFirstPlayer = function() {
        let firstPlayer = '';
        
        while (firstPlayer !== 'X' && firstPlayer !== 'O') {
            firstPlayer = prompt(`Who's going first?`, `Enter "X" or "O"`);
            firstPlayer = firstPlayer.toUpperCase();
        }
        
        switch (firstPlayer) {
            case 'X': 
                playerOne.yourTurn();
                gameController(playerOne, playerTwo).playerMove(playerOne);
                break;
            
            case 'O': 
                playerTwo.yourTurn();
                gameController(playerOne, playerTwo).playerMove(playerTwo);
                break;
        
            default:
                break;            
            }
        }
        
    chooseFirstPlayer();

    return {
    };
};

