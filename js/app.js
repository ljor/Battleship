const player1Board = document.querySelector('#player1-board')
const playerGridSquares= document.querySelectorAll('#player1-board > div')

const playerSquares = []

// Create Gameboard
function createBoard(board, grid) {
    for (let i = 1; i <= 100; i++) {
        let square = document.createElement('div')
        square.dataset.id = i

        // marking edges
        if (i <= 10 || i % 10 === 0 || i >= 91 || i % 10 === 1) {
            square.classList.add('edge')
        }

        board.appendChild(square)
        grid.push(square)
    }
}

createBoard(player1Board, playerSquares)

// Create Gamepieces


// Gamepiece Placement


// Game Start


// Gameplay


// Turn Change


// Color Change (remove later or repurpose for hit; I'm just testing things right now)

function changeColor(square) {
    let randomNumber = Math.floor(Math.random() * 10)

    if (randomNumber <= 7) {
        square.style.backgroundColor = 'white'
    } else {
        square.style.backgroundColor = 'red'
    }
}

player1Board.addEventListener('click', (event)=>{
    console.log(event.target)
    changeColor(event.target)
})