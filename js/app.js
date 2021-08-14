const player1Board = document.querySelector('#p1-board')
const playerGridSquares = document.querySelectorAll('#p1-board > div')
const pieceContainer = document.querySelector('#p1-pieceboard')

const playerSquares = []
const gamePieces = []

// Create Gameboard
function createBoard(board, grid) {
    for (let i = 1; i <= 100; i++) {
        let square = document.createElement('div')
        square.dataset.id = i

        // marking edges
        if (i <= 10) {
            square.classList.add('top-edge')
        }
        if (i % 10 === 0) {
            square.classList.add('right-edge')
        }
        if (i >= 91) {
            square.classList.add('bottom-edge')
        }
        if (i % 10 === 1 || i === 1) {
            square.classList.add('left-edge')
        }

        board.appendChild(square)
        grid.push(square)
    }
}
createBoard(player1Board, playerSquares)

// Create Gamepieces
function createPlayerShips() {
    let destroyerContainer = document.createElement('div')
    destroyerContainer.classList.add('ship', 'destroyer-container')
    for (let i = 0; i < 2; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `destroyer-${i}`)
        destroyerContainer.appendChild(square)
    }
    destroyerContainer.draggable = true
    pieceContainer.appendChild(destroyerContainer)

    let cruiserContainer = document.createElement('div')
    cruiserContainer.classList.add('ship', 'cruiser-container')
    for (let i = 0; i < 3; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `cruiser-${i}`)
        cruiserContainer.appendChild(square)
    }
    cruiserContainer.draggable = true
    pieceContainer.appendChild(cruiserContainer)

    let submarineContainer = document.createElement('div')
    submarineContainer.classList.add('ship', 'submarine-container')
    for (let i = 0; i < 3; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `submarine-${i}`)
        submarineContainer.appendChild(square)
    }
    submarineContainer.draggable = true
    pieceContainer.appendChild(submarineContainer)

    let battleshipContainer = document.createElement('div')
    battleshipContainer.classList.add('ship', 'battleship-container')
    for (let i = 0; i < 4; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `battleship-${i}`)
        battleshipContainer.appendChild(square)
    }
    battleshipContainer.draggable = true
    pieceContainer.appendChild(battleshipContainer)

    let carrierContainer = document.createElement('div')
    carrierContainer.classList.add('ship', 'carrier-container')
    for (let i = 0; i < 5; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `carrier-${i}`)
        carrierContainer.appendChild(square)
    }
    carrierContainer.draggable = true
    pieceContainer.appendChild(carrierContainer)
}
createPlayerShips()

// ship piece selectors
const destroyer = document.querySelector('.destroyer-container')
const cruiser = document.querySelector('.cruiser-container')
const submarine = document.querySelector('.submarine-container')
const battleship = document.querySelector('.battleship-container')
const carrier = document.querySelector('.carrier-container')
const ships = document.querySelectorAll('.ship')

// Piece Rotation
function rotate() {
    destroyer.classList.toggle('destroyer-container-vertical')
    cruiser.classList.toggle('cruiser-container-vertical')
    submarine.classList.toggle('submarine-container-vertical')
    battleship.classList.toggle('battleship-container-vertical')
    carrier.classList.toggle('carrier-container-vertical')
}

// Gamepiece Placement


// Game Start


// Gameplay


// Turn Change


// Color Change (remove later or repurpose for hit; I'm just testing things right now)

function changeColor(square) {
    let randomNumber = Math.floor(Math.random() * 10)

    if (randomNumber <= 7) {
        square.classList.add('miss')
    } else {
        square.classList.add('hit')
    }
}

player1Board.addEventListener('click', (event)=>{
    console.log(event.target)
    console.log(typeof event.target.dataset.id, event.target.dataset.id)
    changeColor(event.target)
})

window.addEventListener('keydown', (event)=> {
    if(event.code === 'KeyR') {
        rotate()
    }
})

// destroyer.addEventListener('mousedown', (event)=> {
//     let test = parseInt(event.target.id.slice(event.target.id.length-1))
//     console.log(typeof test, test)
// })

console.log(ships)

ships.forEach(ship => {
    ship.addEventListener('mousedown', (event)=> {
        let test = parseInt(event.target.id.slice(event.target.id.length-1))
        console.log(typeof test, test)
    })
});