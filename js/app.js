const p1BoardsContainer = document.querySelector('#p1-boards')
const p1Board = document.querySelector('#p1-board')
const p2Board = document.querySelector('#p2-board')
// const playerGridSquares = document.querySelectorAll('#p1-board > div')
const p1PieceContainer = document.querySelector('#p1-pieceboard')
const p2PieceContainer = document.querySelector('#p2-pieceboard')

const p1Squares = []
const p2Squares = []

let selectedShipSectionId
let selectedShip
let draggedShip
let draggedShipLength

let p1Turn = true
let p2Turn = false
let isHorizontal = true

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
function createPlayerShips(container, player) {
    let destroyerContainer = document.createElement('div')
    destroyerContainer.classList.add('ship', 'destroyer-container')
    for (let i = 0; i < 2; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `destroyer-${i}`)
        destroyerContainer.appendChild(square)
    }
    destroyerContainer.draggable = true
    container.appendChild(destroyerContainer)

    let cruiserContainer = document.createElement('div')
    cruiserContainer.classList.add('ship', 'cruiser-container')
    for (let i = 0; i < 3; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `cruiser-${i}`)
        cruiserContainer.appendChild(square)
    }
    cruiserContainer.draggable = true
    container.appendChild(cruiserContainer)

    let submarineContainer = document.createElement('div')
    submarineContainer.classList.add('ship', 'submarine-container')
    for (let i = 0; i < 3; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `submarine-${i}`)
        submarineContainer.appendChild(square)
    }
    submarineContainer.draggable = true
    container.appendChild(submarineContainer)

    let battleshipContainer = document.createElement('div')
    battleshipContainer.classList.add('ship', 'battleship-container')
    for (let i = 0; i < 4; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `battleship-${i}`)
        battleshipContainer.appendChild(square)
    }
    battleshipContainer.draggable = true
    container.appendChild(battleshipContainer)

    let carrierContainer = document.createElement('div')
    carrierContainer.classList.add('ship', 'carrier-container')
    for (let i = 0; i < 5; i++){
        let square = document.createElement('div')
        square.setAttribute('id', `carrier-${i}`)
        carrierContainer.appendChild(square)
    }
    carrierContainer.draggable = true
    container.appendChild(carrierContainer)
}
createPlayerShips(p1PieceContainer)
createPlayerShips(p2PieceContainer)

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
    console.log(isHorizontal)
}


// Gamepiece Placement <-- keep global
ships.forEach((ship) => {ship.addEventListener('dragstart', dragStart)})

// p1 drag event listeners <-- make available only during p1's piece placement phase
p1Squares.forEach((square) => {square.addEventListener('dragstart', dragStart)})
p1Squares.forEach((square) => {square.addEventListener('dragover', dragOver)})
p1Squares.forEach((square) => {square.addEventListener('dragenter', dragEnter)})
p1Squares.forEach((square) => {square.addEventListener('dragleave', dragLeave)})
p1Squares.forEach((square) => {square.addEventListener('drop', dragDrop)})
p1Squares.forEach((square) => {square.addEventListener('dragend', dragEnd)})

// p2 drag event listeners  <-- make available only during p2's piece placement phase
p2Squares.forEach((square) => {square.addEventListener('dragstart', dragStart)})
p2Squares.forEach((square) => {square.addEventListener('dragover', dragOver)})
p2Squares.forEach((square) => {square.addEventListener('dragenter', dragEnter)})
p2Squares.forEach((square) => {square.addEventListener('dragleave', dragLeave)})
p2Squares.forEach((square) => {square.addEventListener('drop', dragDrop)})
p2Squares.forEach((square) => {square.addEventListener('dragend', dragEnd)})

function dragStart() {
    draggedShip = this
    draggedShipLength = this.childNodes.length
}

function dragOver(e) {
    e.preventDefault()

    if (isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('drag-over')
        }
    } else if (!isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.add('drag-over')
        }
    }
}
  
function dragEnter(e) {
    e.preventDefault()

    if (isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('drag-over')
        }
    } else if (!isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.add('drag-over')
        }
    }
}
  
function dragLeave(e) {
    console.log('drag leave')
    
    if (isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.remove('drag-over')
        }
    } else if (!isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.remove('drag-over')
        }
    }
}

// Logic gaps to fix: ship edge wrapping and ship placement stacking
function dragDrop() {
    if (isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.remove('drag-over')
        }
    } else if (!isHorizontal) {
        for (let i = 0; i < draggedShipLength; i++) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.remove('drag-over')
        }
    }
    console.log(this.classList.contains('right-edge'))
    
    if (isHorizontal) {
      for (let i = 0; i < draggedShipLength; i++) {
        p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('taken', 'horizontal',  selectedShip)
        if (i === 0) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('start')
        }
        if (i === draggedShipLength - 1){
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('end')
        }
      }
    } else if (!isHorizontal) {
      for (let i = 0; i < draggedShipLength; i++) {
        p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.add('taken', 'vertical', selectedShip)
        if (i === 0) {
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('start')
        }
        if (i === draggedShipLength - 1){
            p1Squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.add('end')
        }
      }
    } else return
    
    p1PieceContainer.removeChild(draggedShip)
  }
  
  function dragEnd() {
    console.log('dragend')
  }

// Game Start


// Gameplay


// Turn Change


// Color Change (remove later or repurpose for hit; I'm just testing things right now)

function changeColor(square) {
    if (!square.classList.contains('taken')) {
        square.classList.add('miss')
    } else {
        square.classList.add('hit')
    }
}

p1Board.addEventListener('click', (event)=>{
    console.log(event.target)
    console.log(typeof event.target.dataset.id, event.target.dataset.id)
    changeColor(event.target)
})

p2Board.addEventListener('click', (event)=>{
    console.log(event.target)
    console.log(typeof event.target.dataset.id, event.target.dataset.id)
    changeColor(event.target)
})

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
