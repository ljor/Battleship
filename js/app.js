const setupDialog = document.querySelector('#setup')
const instructionsDialog = document.querySelector('#instructions')
const warningDialog = document.querySelector('#warning')

const p1Input = document.querySelector('#player1')
const p2Input = document.querySelector('#player2')
const p1Board = document.querySelector('#p1-board')
const p2Board = document.querySelector('#p2-board')
const p1GridSquares = document.querySelectorAll('#p1-board > div')
const p2GridSquares = document.querySelectorAll('#p2-board > div')
const p1Pieces = document.querySelector('#pieceboard1')
const p2Pieces = document.querySelector('#pieceboard2')
const display = document.querySelector('#message-display')

const startBtn = document.querySelector('#start')
const finishedBtn = document.querySelector('#finished')
const revealBtn = document.querySelector('#reveal')
const restartBtn = document.querySelector('#new-game')
const okayRulesBtn = document.querySelector('#close')
const okayRevealBtn = document.querySelector('#ok')
const cancelBtn = document.querySelector('#cancel')
const instructionsBtn = document.querySelector('#how-to')

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

let p1Turn = true
let p2Turn = false

let isHorizontal = true

// Score Tracking
let p1Destroyer = 2
let p1Cruiser = 3
let p1Submarine = 3
let p1Battleship = 4
let p1Carrier = 5

let p1Score = 17

let p2Destroyer = 2
let p2Cruiser = 3
let p2Submarine = 3
let p2Battleship = 4
let p2Carrier = 5

let p2Score = 17

restartBtn.style.display = 'none'
revealBtn.style.display ='none'




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
    for (let i = 0; i <= 100; i++) {
        let square = document.createElement('div')
        square.dataset.id = i

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
    constructor(ship, length, owner) {
        super(ship, length)
        this.owner = owner
    }
    createPieces(board) {
        let shipContainer = document.createElement('div')
        shipContainer.classList.add('ship', `${this.ship}`, `${this.ship}-container`)
        shipContainer.draggable = true
        
        for (let i = 0; i < this.length; i++){
            let parts = document.createElement('div')
            parts.setAttribute('id', `${this.owner}-${this.ship}-${i}`)
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
  p2Ships.forEach((index) => index.createPieces(p2Pieces))

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
function slowText(text) {
    const displayScreen = setTimeout(() => {
        display.innerText = text
    }, 1400);
}

function finishedPlacement() {
    if (p1Turn === true) {
        p2Turn = true
        p1Turn = false

        p1Board.style.display = 'none'
        p2Board.style.display = 'grid'

        p1Pieces.remove()
        p2Pieces.style.display = 'flex'
        display.innerText =`${p2Name}, place your ships on the board. Press 'R' to rotate them.`
    } else {
        p1Turn = true
        p2Turn = false

        p1Board.style.display = 'grid'
        p2Pieces.remove()
        finished.style.display = 'none'
        revealBtn.style.display ='block'

        playerTurn()
    }
}

// Turn Change
function playerTurn() {

    if(p1Turn === true) {
        slowText(`${p1Name}, you may fire when ready.`)

        p2Board.addEventListener('click', attack)
        p1Board.removeEventListener('click', attack)
        p1Turn = false
        p2Turn = true
    } else if(p2Turn === true) {
       slowText(`${p2Name}... Ready. Aim. FIRE!`)

        p1Board.addEventListener('click', attack)
        p2Board.removeEventListener('click', attack)

        p2Turn = false
        p1Turn = true
    }
}

function attack(event) {
    let square = event.target
    if (!square.classList.contains('targeted')){
        if (!square.classList.contains('taken')) {
            square.classList.add('miss', 'targeted')
            display.innerText = 'You missed.'
            playerTurn()
        } else {
            square.classList.add('hit', 'targeted')
            display.innerText = 'You hit!'
            updateScore(square)
        }
    } else if (square.classList.contains('targeted')) {
        display.innerText = 'You\'ve already tried attacking this square! Target a different square.'
    }
}

function updateScore(square) {
    if (square.classList.contains('p1-destroyer')) p1Destroyer--
    else if (square.classList.contains('p1-cruiser')) p1Cruiser-- 
    else if (square.classList.contains('p1-submarine')) p1Submarine--
    else if (square.classList.contains('p1-battleship')) p1Battleship--
    else if (square.classList.contains('p1-carrier')) p1Carrier--
    p1Score = p1Destroyer + p1Cruiser + p1Submarine + p1Battleship + p1Carrier

    if (square.classList.contains('p2-destroyer')) p2Destroyer--
    else if (square.classList.contains('p2-cruiser')) p2Cruiser-- 
    else if (square.classList.contains('p2-submarine')) p2Submarine--
    else if (square.classList.contains('p2-battleship')) p2Battleship--
    else if (square.classList.contains('p2-carrier')) p2Carrier--
    p2Score = p2Destroyer + p2Cruiser + p2Submarine + p2Battleship + p2Carrier

    destroyedCheck()
}

function destroyedCheck() {
    if (p1Destroyer === 0) {
        display.innerText = `You destroyed ${p1Name}'s destroyer!`
    } else if (p1Cruiser === 0) {
        display.innerText = `You destroyed ${p1Name}'s cruiser!`
    } else if (p1Submarine === 0) {
        display.innerText = `You destroyed ${p1Name}'s submarine!`
    } else if (p1Battleship === 0) {
        display.innerText = `You destroyed ${p1Name}'s battleship!`
    } else if (p1Carrier === 0) {
        display.innerText = `You destroyed ${p1Name}'s carrier!`
    }
    
    if (p2Destroyer === 0) {
        display.innerText = `You destroyed ${p2Name}'s destroyer!`
    } else if (p2Cruiser === 0) {
        display.innerText = `You destroyed ${p2Name}'s cruiser!`
    } else if (p2Submarine === 0) {
        display.innerText = `You destroyed ${p2Name}'s submarine!`
    } else if (p2Battleship === 0) {
        display.innerText = `You destroyed ${p2Name}'s battleship!`
    } else if (p2Carrier === 0) {
        display.innerText = `You destroyed ${p2Name}'s carrier!`
    }
    gameOver()
}

function gameOver() {
    if (p1Score === 0) {
        display.innerText = `${p2Name} wins! ${p1Name}'s ships have all been destroyed.`
        restartBtn.style.display = 'block'
    } else if (p2Score === 0) {
        display.innerText = `${p1Name} wins! ${p2Name}'s ships have all been destroyed.`
        restartBtn.style.display = 'block'
    } else {
        playerTurn()
    }
}

function newGame() {
    location.reload()
}

function closeDialog() {
    warningDialog.close()
    instructionsDialog.close()
}

// Event Listeners
window.addEventListener('keydown', (event)=> {
    if(event.code === 'KeyR') {
        rotate()
    }
})

ships.forEach(ship => {
    ship.addEventListener('mousedown', (event)=> {
        selectedShipSectionId = parseInt(event.target.id.slice(event.target.id.length-1))
        selectedShip = (event.target.id.slice(0, -2))
    })
})

window.addEventListener('load', () => {
    setupDialog.showModal()
  });

  cancelBtn.addEventListener('click', closeDialog)
  
  instructionsBtn .addEventListener('click', ()=> {
      instructionsDialog.showModal()
  })

//   okayRevealBtn.addEventListener('click', revealPieces)

  okayRulesBtn.addEventListener('click', closeDialog)

  startBtn.addEventListener('click', startGame)

  restartBtn.addEventListener('click', newGame)

  revealBtn.addEventListener('click', () => {
      warningDialog.showModal()
    })

  finishedBtn.addEventListener('click', finishedPlacement)

dragAndDrop(p1Squares, p1Pieces);
dragAndDrop(p2Squares, p2Pieces);