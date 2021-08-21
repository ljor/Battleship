let selectedShipSectionId
let selectedShip
let draggedShip
let draggedShipLength

function dragAndDrop(squares, pieces) {
    ships.forEach((ship) => {ship.addEventListener('dragstart', dragStart)})

    squares.forEach((square) => {square.addEventListener('dragstart', dragStart)})
    squares.forEach((square) => {square.addEventListener('dragover', dragOver)})
    squares.forEach((square) => {square.addEventListener('dragleave', dragLeave)})
    squares.forEach((square) => {square.addEventListener('drop', dragDrop)})

    let overSquares = []

    function clearOver() {
        overSquares.forEach((squareNumber) => {
            squares[squareNumber].classList.remove('drag-over')
        })

        overSquares = []
    }

    function getTensPlace(number) {
        return Math.floor(number / 10)
    }

    function checkEdges(currentSquareNumber, selectedShipSectionId) {
        const invertedSelectedShipSectionId = draggedShipLength - selectedShipSectionId

        if (isHorizontal) {
            if (getTensPlace((invertedSelectedShipSectionId + currentSquareNumber))
                != getTensPlace((currentSquareNumber))
            ) {
                return selectedShipSectionId + (invertedSelectedShipSectionId + currentSquareNumber) - ((Math.ceil((currentSquareNumber) / 10)) * 10)
            } else if (getTensPlace((currentSquareNumber - selectedShipSectionId))
                != getTensPlace((currentSquareNumber))
            ) {
                return selectedShipSectionId + (currentSquareNumber - selectedShipSectionId) - (getTensPlace((currentSquareNumber)) * 10)
            } else {
                return selectedShipSectionId
            }
        } else if (!isHorizontal) {
            if (currentSquareNumber + ((invertedSelectedShipSectionId) * 10) > 139) {
                return selectedShipSectionId + 4
            } else if (currentSquareNumber + ((invertedSelectedShipSectionId) * 10) > 129) {
                return selectedShipSectionId + 3
            } else if (currentSquareNumber + ((invertedSelectedShipSectionId) * 10) > 119) {
                return selectedShipSectionId + 2
            } else if (currentSquareNumber + ((invertedSelectedShipSectionId) * 10) > 109) {
                return selectedShipSectionId + 1
            } else if (currentSquareNumber + ((invertedSelectedShipSectionId) * 10) > 99) {
                return selectedShipSectionId
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -30) {
                return selectedShipSectionId - 4
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -20) {
                return selectedShipSectionId - 3
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -10) {
                return selectedShipSectionId - 2
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < 0) {
                return selectedShipSectionId - 1
            } else {
                return selectedShipSectionId
            }
        }
    }

    function dragStart() {
        draggedShip = this
        draggedShipLength = this.childNodes.length
    }

    function dragOver(e) {
        e.preventDefault()

        let currentSelectedShipSectionId = checkEdges(parseInt(this.dataset.id), selectedShipSectionId)

        for (let i = 0; i < draggedShipLength; i++) {
            let squareNumber;

            if (isHorizontal) {
                squareNumber = parseInt(this.dataset.id) - currentSelectedShipSectionId + i
            } else if (!isHorizontal) {
                squareNumber = parseInt(this.dataset.id) + ((i - currentSelectedShipSectionId) * 10)
            }

            squares[squareNumber].classList.add('drag-over')
            overSquares.push(squareNumber)
        }
    }
    
    function dragLeave(e) {
        clearOver()
    }

    function dragDrop() {

        clearOver()
        
        let currentSelectedShipSectionId = checkEdges(parseInt(this.dataset.id), selectedShipSectionId)

        for (let i = 0; i < draggedShipLength; i++) {
            let squareNumber
            let orientation
            
            if (isHorizontal) {
                orientation = 'horizontal'
                squareNumber = parseInt(this.dataset.id) - currentSelectedShipSectionId + i
            } else if (!isHorizontal) {
                orientation = 'vertical'
                squareNumber = parseInt(this.dataset.id) + ((i - currentSelectedShipSectionId) * 10)
            }

            squares[squareNumber].classList.add('taken', orientation, selectedShip)
            if (i === 0) {
                squares[squareNumber].classList.add('start')
            }
            if (i === draggedShipLength - 1){
                squares[squareNumber].classList.add('end')
            }
        }

        pieces.removeChild(draggedShip)
    } 
}