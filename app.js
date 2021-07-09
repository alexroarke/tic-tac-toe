const parentDiv = document.querySelector('.main-div');
const gameboardContainer = parentDiv.querySelector('.game-board-container');

for (let i = 0; i < 9; i++) {
    let span = document.createElement('span');
    gameboardContainer.append(span);
}

document.querySelectorAll('span').forEach(span => {
    span.addEventListener('click', event => {
        span.textContent = "Clicked";
    });
})

