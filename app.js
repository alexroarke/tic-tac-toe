const parentDiv = document.querySelector('.main-div');
const gameboardContainer = parentDiv.querySelector('.game-board-container');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessage = document.querySelector('.winning-message')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.querySelector('.restart-button')
const CAT_CLASS = 'playerX';
const DOG_CLASS = 'playerO';

const WinningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const startGame = () => {
    cellElements.forEach(cell => {
        cell.addEventListener('click', displayController.handleClick, {once: true});
    })    
    displayController.setHoverClass();
}

const restartGame = () => {
    cellElements.forEach(cell => {
        cell.classList.remove(CAT_CLASS);
        cell.classList.remove(DOG_CLASS);
        cell.removeEventListener('click', displayController.handleClick);
    })   
    winningMessage.classList.remove('show');
    startGame();
}

const gameBoard = (() => {
    const cells = () => {
        for (let i = 0; i < 9; i++) {
            let div = document.createElement('div');
            div.classList.add('cell');
            div.setAttribute('data-cell', '');
            gameboardContainer.append(div);
        }
    }  
    return {
        cells
    }
})();

const gameLogic = (() => {
    const endGame = (draw) => {
        if (draw) {
            winningMessageText.innerText = "Game Draw!"
            console.log("draw")
        } else {
            winningMessageText.innerText = `${playerOnesTurn ? "Dog" : "Cat"} Wins!`
            console.log("winner")
        }
        winningMessage.classList.add('show')
    }
    
    const isDraw = () => {
        return [...cellElements].every(cell => {
            return cell.classList.contains(DOG_CLASS) || cell.classList.contains(CAT_CLASS)
        })
    }
    
    const checkWin = (currentClass)  => {
        return WinningCombinations.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            })
        })
    }

    return {
        endGame, isDraw, checkWin
    }
})();

let playerOnesTurn = true;
const displayController = (() => {

    const changePlayer = () => {
        playerOnesTurn = !playerOnesTurn;
    }

    const addClass = (cell, currentClass) => {
        cell.classList.add(currentClass);
    }

    const setHoverClass = () => {
        gameboardContainer.classList.remove('playerOnesTurn');
        gameboardContainer.classList.remove('playerTwosTurn');
    
        if (playerOnesTurn) {
            gameboardContainer.classList.add('playerOnesTurn');
        } else {
            gameboardContainer.classList.add('playerTwosTurn');
        }
    }

    const handleClick = (e) => {
        const cell = e.target;
        const currentClass = playerOnesTurn ? CAT_CLASS : DOG_CLASS;
        addClass(cell, currentClass);
        changePlayer();
        setHoverClass();
        if (gameLogic.checkWin(currentClass)) {
            gameLogic.endGame(false);
        } else if (gameLogic.isDraw()) {
            gameLogic.endGame(true);
        }
    } 

    return {
        handleClick, setHoverClass
    }
})();

restartButton.addEventListener('click', restartGame)

startGame();
