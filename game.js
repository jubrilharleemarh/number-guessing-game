// Import readline module
const readline = require('readline');

// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to generate a random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Random number between min and max
}

// Function to start the game
function startGame() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I have picked a number between 1 and 100.");
    console.log("Your job is to guess the number. Let's start!");

    // Define the range and generate a random number
    var min = 1;
    var max = 100;
    var randomNumber = getRandomNumber(min, max);
    var attempts = 0; // Keep track of the number of guesses

    function askForGuess() {
        rl.question(`Enter your guess (${min}-${max}): `, function (input) {
            var guess = Number(input); // Convert the input to a number

            // Check if the input is valid
            if (isNaN(guess) || guess < min || guess > max) {
                console.log("Invalid input. Please enter a number within the range.");
                askForGuess(); // Ask again
                return;
            }

            // Increment attempts
            attempts++;

            // Check if the guess is correct
            if (guess < randomNumber) {
                console.log("Too low! Try again.");
                askForGuess();
            } else if (guess > randomNumber) {
                console.log("Too high! Try again.");
                askForGuess();
            } else {
                console.log(`Congratulations! You guessed the correct number (${randomNumber}) in ${attempts} attempts.`);
                rl.question("Do you want to play again? (yes/no): ", function (playAgain) {
                    if (playAgain.toLowerCase() === "yes") {
                        startGame(); // Restart the game
                    } else {
                        console.log("Thanks for playing! Goodbye!");
                        rl.close();
                    }
                });
            }
        });
    }

    // Start asking for guesses
    askForGuess();
}

// Start the game when the script is run
startGame();
