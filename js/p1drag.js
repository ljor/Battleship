ships.forEach((ship) => {ship.addEventListener('dragstart', dragStart)})
// p1 drag event listeners  <-- make available only during p1's piece placement phase
p1Squares.forEach((square) => {square.addEventListener('dragstart', dragStart)})
p1Squares.forEach((square) => {square.addEventListener('dragover', dragOver)})
p1Squares.forEach((square) => {square.addEventListener('dragenter', dragEnter)})
p1Squares.forEach((square) => {square.addEventListener('dragleave', dragLeave)})
p1Squares.forEach((square) => {square.addEventListener('drop', dragDrop)})
p1Squares.forEach((square) => {square.addEventListener('dragend', dragEnd)})

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
    
    p1Pieces.removeChild(draggedShip)
  }
  
  function dragEnd() {
    console.log('dragend')
  }