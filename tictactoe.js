// Tic Tac Toe

let gameBoard = {
    board: ['X','O','X','O','X','O','X','O','X',],
};

// const controller = (playerTurn) => {
//     const placePlayer = 
//     // player 1 is X
//     // player 2 is O
// }

const playerFactory = (name, marker) => {
    const welcomeMsg = () => console.log(`Welcome ${name}!`);
    const yourTurn = () => console.log(`Your turn ${name}!`);
    return { 
        name: name, 
        marker: marker,
        welcomeMsg,
        yourTurn,
    };
};
  
const playerOne = playerFactory('Joe Player 1', 'X');
const playerTwo = playerFactory('Zoe Player 2', 'O');
  
console.log(playerOne.name); 
console.log(playerTwo.name); 

playerOne.welcomeMsg(); // calls the function and logs 'hello!'
playerTwo.welcomeMsg(); // calls the function and logs 'hello!'

// const displayBoard = (boardIndex, marker) => {
// }

function displayBoard(boardArray) {
    boardArray.forEach(function(val, index, theArray){
        document.querySelector(`#tile${index}`).innerHTML = theArray[index];
    });
}


