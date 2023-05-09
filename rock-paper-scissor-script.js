function playRound() {
    /* Prompts the player to enter a choice and returns a value between 1 and 3 */
    function getPlayerChoice () {
        let userInput = prompt("Rock, Paper, Scissor?");
        let lowcaseUserInput = userInput.toLowerCase();

        if (lowcaseUserInput === "rock" || lowcaseUserInput === "paper" || lowcaseUserInput === "scissor"){
            return lowcaseUserInput;
        } else {
            let wrongOption = confirm("Wrong Option - Reenter?");
            if (wrongOption) {
                getPlayerChoice();
            } else {
                alert("Bye!");
            }
        };
    };

    /* Funktion get a random number from computer */
    function getComputerChoice() {
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
                let wrongOption = confirm("Wrong choice entered: Reenter choice!");
                if (wrongOption) {
                    getPlayerChoice();
                } else {
                    alert("Bye!");
                };
        };
    };

    let playerSelection = getPlayerChoice();
    let computerSelection = getComputerChoice();

    switch (true) {
        /* Sets the cases where the choices are the same */
        case playerSelection == computerSelection:
            let tieOption = confirm("It's a tie! - Replay?" );
            if (tieOption) {
                playRound();
            } else {
                alert("Bye!");
            }
        break;
        
        /* Set case where you win */
        case playerSelection == "rock" && computerSelection == "scissor":
        case playerSelection == "paper" && computerSelection == "rock":
        case playerSelection == "scissor" && computerSelection == "paper": 
            let winOption = confirm("You win! " + playerSelection.charAt(0).toLocaleUpperCase() + playerSelection.slice(1) + " beats " + computerSelection + " ! - Replay?");
            if (winOption) {
                playRound();
            } else {
                alert("Bye!");
            }
        break;

        /* Set the default to a replay option */
        default:
            let errorOption = confirm("You lose! - Play again?")
            if (errorOption){
                playRound();
            } else {
                alert("Bye!");
            };
    };
};