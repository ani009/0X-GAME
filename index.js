const h1=document.querySelector("h1");
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button");
    let currentPlayer = 'O';

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.textContent === '') {
                button.textContent = currentPlayer;
                currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
                checkWinner();
            }
        });
    });

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        function isWinner() {
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (buttons[a].textContent !== '' &&
                    buttons[a].textContent === buttons[b].textContent &&
                    buttons[b].textContent === buttons[c].textContent) {
                    return true;
                }
            }
            return false;
        }

        // Check for a tie
        if ([...buttons].every((button) => button.textContent !== '') && !isWinner()) {
            h1.innerHTML='It\'s a tie!';
            setTimeout(()=>{
                h1.innerHTML=`Click Any Button To start The Game`;
            },4000);
            resetGame();
        }
        
        // Check for a winner
        if (isWinner()) {
            h1.innerHTML=`Player ${currentPlayer === 'O' ? 'X' : 'O'} wins!`;
            setTimeout(()=>{
                h1.innerHTML=`Click Any Button To start The Game`;
            },4000);
            resetGame();
        }
    }

    function resetGame() {
        buttons.forEach((button) => {
            button.textContent = '';
        });
        currentPlayer = 'O';
    }
});
