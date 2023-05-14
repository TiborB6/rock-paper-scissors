function replayButton(parentNode, removeChild) { //Creates a button that when clicked removes itself and an extra child
    const parent = parentNode;
    const remove = removeChild;
    const button = document.createElement("button");
        button.textContent = "Replay?"; 
    
    parent.appendChild(button);

    button.addEventListener("click", () => {
        parent.removeChild(button);
        parent.removeChild(remove);
        resetRoundInterface();
        
        const choiceButtons = document.querySelectorAll("#choice-buttons > button");
        choiceButtons.forEach(button => {
          button.addEventListener("click", () => {
            let buttonId = button.id;
            playRound(buttonId);
          });
        });
    });
};

function generateOutcomeElement(outcomeText, parent) { // Generates an outcome text which is used in the playRound() logic
    const outcome = document.createElement("p");
        outcome.textContent = outcomeText; 
    parent.appendChild(outcome);

    replayButton(parent, outcome); 
}; 

// It delets the choice button and displays player and computer choice
function changeRoundInterface(playerSelect, computerSelect) {
    const parent = document.querySelector(".game");
    const vs = document.querySelector("#vs");
    const buttons = document.querySelector("#choice-buttons");
    const computer = document.querySelector("#computer");

    parent.removeChild(buttons);
    parent.removeChild(computer);

    const playerChoice = document.createElement("p");
        playerChoice.textContent = playerSelect;
        playerChoice.id = "player-choice";
    const computerChoice = document.createElement("p");
        computerChoice.textContent = computerSelect;
        computerChoice.id = "computer-choice";

    parent.insertBefore(playerChoice, vs);
    parent.appendChild(computerChoice);
};

// The fucntion to cancel it all out
function resetRoundInterface() {
    const parent = document.querySelector(".game");
    const vs = document.querySelector("#vs");
    const playerChoice = document.querySelector("#player-choice");
    const computerChoice = document.querySelector("#computer-choice");
  
    parent.insertBefore(vs, playerChoice);
    parent.removeChild(playerChoice);
    parent.removeChild(computerChoice);
  
    const choiceButtons = document.createElement("div");
    choiceButtons.id = "choice-buttons";
    choiceButtons.innerHTML = `
      <button id="rock">Rock</button>
      <button id="paper">Paper</button>
      <button id="scissors">Scissors</button>
    `;
    parent.insertBefore(choiceButtons, vs);
  
    const output = document.querySelector(".output");
    output.innerHTML = "";
};


function getComputerChoice() { // Generates a random choice from the computer and shows it on the screen
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    switch (randomNumber) {
        case 1:
            return "rock";   
        break;

        case 2:
            return "paper";
        break;

        case 3:
            return "scissor";
        break;

        default:
            console.log("ERROR getComputerChoice");
    };
};

function playRound(buttonId) { // Generates the game logic with a switch statement and sets the explained cases
    let playerSelection = buttonId;
    let computerSelection = getComputerChoice();

    const parent = document.querySelector(".output");

    // If statements creates the logic behind the game 
    if (playerSelection == computerSelection) { // Tie
        generateOutcomeElement("It's a tie", parent);
        changeRoundInterface(playerSelection, computerSelection);
    } else if ( // Win
        playerSelection == "rock" && computerSelection == "scissor" ||
        playerSelection == "paper" && computerSelection == "rock" ||
        playerSelection == "scissor" && computerSelection == "paper"
    ) { // Lose
        generateOutcomeElement("You win!", parent);
        changeRoundInterface(playerSelection, computerSelection);
    } else {
        generateOutcomeElement("You lose!", parent);
        changeRoundInterface(playerSelection, computerSelection);
    };
};


// This part is the initiatir for the game and sets the player Choice
const choiceButtons = document.querySelectorAll("#choice-buttons > button");
choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        let buttonId = button.id; 

        playRound(buttonId);
    })
});


