const setupDialog = document.querySelector('#setup')
const p1Input = document.querySelector('#player1')
const p2Input = document.querySelector('#player2')
const p1BoardsContainer = document.querySelector('#p1-boards')
const p1Board = document.querySelector('#p1-board')
const p2Board = document.querySelector('#p2-board')
// const playerGridSquares = document.querySelectorAll('#p1-board > div')
const p1Pieces = document.querySelector('#pieceboard1')
const p2Pieces = document.querySelector('#pieceboard2')
const display = document.querySelector('#message-display')
const start = document.querySelector('#start')
const finished = document.querySelector('#finished')

const p1Squares = []
const p2Squares = []

const shipTypes = [
    'destroyer',
    'cruiser',
    'submarine',
    'battleship',
    'carrier'
  ]
  
const p1Ships = []
const p2Ships = []

let p1Name = 'Player 1'
let p2Name = 'Player 2'

let selectedShipSectionId
let selectedShip
let draggedShip
let draggedShipLength

let p1Turn = true
let p2Turn = false
let isHorizontal = true

// Game Start
const startGame = ()=> {
    p1Name = p1Input.value
    p2Name = p2Input.value
    
    setupDialog.close()

    p1Turn = true
    p2Turn = false  

    display.innerText = `${p1Name}, place your ships on the board. Press 'R' to rotate them.`

    p2Board.style.display = 'none'
    p2Pieces.style.display = 'none'
}

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
createBoard(p1Board, p1Squares)
createBoard(p2Board, p2Squares)

// Create Gamepieces 
class Ship {
    constructor(ship, length) {
        this.ship = ship
        this.length = length
        this.directions = []
  
        let wplaceholder = []
        let vplaceholder = []
  
        for (let i = 0; i < this.length; i++) {
            wplaceholder.push(i)
            vplaceholder.push(i * 10)
      }
        this.directions.push(wplaceholder, vplaceholder)
    }
  }
  
class playerShip extends Ship {
    constructor(ship, length, owner, directions) {
        super(ship, length, directions)
        this.owner = owner
    }
    createPieces(board) {
        let shipContainer = document.createElement('div')
        shipContainer.classList.add('ship', `${this.ship}`, `${this.ship}-container`)
        shipContainer.draggable = true
        
        for (let i = 0; i < this.length; i++){
            let parts = document.createElement('div')
            parts.setAttribute('id', `${this.owner}${this.ship}-${i}`)
            shipContainer.appendChild(parts)
      }
      board.appendChild(shipContainer)
    }
  }
  
  function generateShips(ship, index) {
    if (index < 2) {
      p1Ships.push(new playerShip(ship, index + 2, 'p1'))
      p2Ships.push(new playerShip(ship, index + 2, 'p2'))
    } else if (index >= 2) {
      p1Ships.push(new playerShip(ship, index + 1, 'p1'))
      p2Ships.push(new playerShip(ship, index + 1, 'p2'))
    }
  }
  
  shipTypes.forEach(generateShips);
  
  p1Ships.forEach((index) => index.createPieces(p1Pieces))
  p1Ships.forEach((index) => index.createPieces(p2Pieces))

console.log(typeof p1Pieces)

// ship piece selectors
const destroyer = document.querySelectorAll('.destroyer-container')
const cruiser = document.querySelectorAll('.cruiser-container')
const submarine = document.querySelectorAll('.submarine-container')
const battleship = document.querySelectorAll('.battleship-container')
const carrier = document.querySelectorAll('.carrier-container')
const ships = document.querySelectorAll('.ship')

// Piece Rotation
function rotate() {
    if (isHorizontal === true) {
        destroyer.forEach(element => {
            element.classList.toggle('destroyer-container-vertical')  
        })
        cruiser.forEach(element => {
            element.classList.toggle('cruiser-container-vertical')
        })
        submarine.forEach(element => {
            element.classList.toggle('submarine-container-vertical')
        })
        battleship.forEach(element => {
            element.classList.toggle('battleship-container-vertical')
        })
        carrier.forEach(element => {
            element.classList.toggle('carrier-container-vertical')
        }) 
        isHorizontal = false
    } else if (isHorizontal === false) {
        destroyer.forEach(element => {
            element.classList.toggle('destroyer-container-vertical')  
        })
        cruiser.forEach(element => {
            element.classList.toggle('cruiser-container-vertical')
        })
        submarine.forEach(element => {
            element.classList.toggle('submarine-container-vertical')
        })
        battleship.forEach(element => {
            element.classList.toggle('battleship-container-vertical')
        })
        carrier.forEach(element => {
            element.classList.toggle('carrier-container-vertical')
        }) 
        isHorizontal = true
    }
}

// Gameplay

function finishedPlacement() {
    if (p1Turn === true) {
        p2Turn = true
        p1Turn = false

        p1Squares.forEach((square) => {square.removeEventListener('dragstart', dragStart)})
        p1Squares.forEach((square) => {square.removeEventListener('dragover', dragOver)})
        p1Squares.forEach((square) => {square.removeEventListener('dragenter', dragEnter)})
        p1Squares.forEach((square) => {square.removeEventListener('dragleave', dragLeave)})
        p1Squares.forEach((square) => {square.removeEventListener('drop', dragDrop)})
        p1Squares.forEach((square) => {square.removeEventListener('dragend', dragEnd)})

        p1Board.style.display = 'none'
        p2Board.style.display = 'grid'

        p1Pieces.remove()
        p2Pieces.style.display = 'flex'
        display.innerText = `${p2Name}, place your ships on the board. Press 'R' to rotate them.`
        console.log(ships, destroyer)
    } else {
        p1Turn = true
        p2Turn = false

        p1Board.style.display = 'grid'
        p2Pieces.remove()

        playerTurn(p1Turn, p2Turn)
    }
}


// Turn Change
function playerTurn(p1, p2) {
    finished.style.display = 'none'
    if(p1 === true) {
        console.log(p1 === true)
    }
}

function attack(square) {
    if (!square.classList.contains('targeted')){
        if (!square.classList.contains('taken')) {
            square.classList.add('miss', 'targeted')
        } else {
            square.classList.add('hit', 'targeted')
        }
    } else {
        display.innerText = 'You\'ve already tried attacking this square!'
    }
}

p1Board.addEventListener('click', (event)=>{
    console.log(event.target)
    console.log(typeof event.target.dataset.id, event.target.dataset.id)
    attack(event.target)
})

p2Board.addEventListener('click', (event)=>{
    console.log(event.target)
    console.log(typeof event.target.dataset.id, event.target.dataset.id)
    attack(event.target)
})

window.addEventListener('keydown', (event)=> {
    if(event.code === 'KeyR') {
        rotate()
    }
})

ships.forEach(ship => {
    ship.addEventListener('mousedown', (event)=> {
        console.log(event.target)
        selectedShipSectionId = parseInt(event.target.id.slice(event.target.id.length-1))
        selectedShip = (event.target.id.slice(2, -2))
        console.log(selectedShip)
    })
})

window.addEventListener('load', () => {
    setupDialog.showModal()
  });

  start.addEventListener('click', () => {
    startGame()
  })

  finished.addEventListener('click', ()=> {finishedPlacement()})