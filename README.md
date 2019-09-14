# tic_tac_toe
a simple tic tac toe game.

Requirements:
--- // Store the gameboard inside an array
--- // Store players inside of objects
// Create an object to control the flow of the game
// Have as little global code as possible
--- // Place everything inside of a module or factory
// If you ever need one of something (gameBoard, displayController), use a module
--- // If you need multiples of something (players), create them with factories
// Write a JavaScript function to render the contents of the gameBoard array to the webpage (initially fill it manually with Xs and Os)
--- // Build functions to:
--- //  - Add marks to a specific spot on the gameBoard
--- //  - Tie it to the DOM by letting players click on the gameBoard to place their marker
--- //  - Make sure players can't play in spots that are taken
// Each piece of functionality should be able to fit in the game, player or gameBoard objects
//  - Put them in "logical" places
//  - Brainstorm to make life easier
// Build the logic that checks for when the game is over
//  - Check for 3 in-a-row
//  - Check for tie game
// Allow players to input their name
// Include a button to start/replay
// Add a display element to congratulate the winning player
// Extra Credit:
//  - Create CPU player for single player game
//  - Start by getting the CPU to make a random move
//  - Work on making the CPU smarter
//  - Use the minmax algorithm to create an unbeatable AI