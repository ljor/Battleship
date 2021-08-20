function dragAndDrop(squares, pieces) {
    ships.forEach((ship) => {ship.addEventListener('dragstart', dragStart)})
    // p1 drag event listeners  <-- make available only during p1's piece placement phase
    squares.forEach((square) => {square.addEventListener('dragstart', dragStart)})
    squares.forEach((square) => {square.addEventListener('dragover', dragOver)})
    // squares.forEach((square) => {square.addEventListener('dragenter', dragEnter)})
    squares.forEach((square) => {square.addEventListener('dragleave', dragLeave)})
    squares.forEach((square) => {square.addEventListener('drop', dragDrop)})
    squares.forEach((square) => {square.addEventListener('dragend', dragEnd)})

    let overSquares = [];

    function clearOver() {
        overSquares.forEach((squareNumber) => {
            squares[squareNumber].classList.remove('drag-over');
        });

        overSquares = [];
    }

    function checkEdges(currentSquareNumber, selectedShipSectionId) {
        if (isHorizontal) {
            if (Math.floor((draggedShipLength - selectedShipSectionId + currentSquareNumber) / 10)
                != Math.floor((currentSquareNumber) / 10)
            ) {
                return selectedShipSectionId + (draggedShipLength - selectedShipSectionId + currentSquareNumber) - ((Math.ceil((currentSquareNumber) / 10)) * 10)
            } else if (Math.floor((currentSquareNumber - selectedShipSectionId) / 10)
                != Math.floor((currentSquareNumber) / 10)
            ) {
                return selectedShipSectionId + (currentSquareNumber - selectedShipSectionId) - (Math.floor((currentSquareNumber) / 10) * 10);
            } else {
                return selectedShipSectionId;
            }
        } else if (!isHorizontal) {
            if (currentSquareNumber + ((draggedShipLength - selectedShipSectionId) * 10) > 139) {
                return selectedShipSectionId + 4;
            } else if (currentSquareNumber + ((draggedShipLength - selectedShipSectionId) * 10) > 129) {
                return selectedShipSectionId + 3;
            } else if (currentSquareNumber + ((draggedShipLength - selectedShipSectionId) * 10) > 119) {
                return selectedShipSectionId + 2;
            } else if (currentSquareNumber + ((draggedShipLength - selectedShipSectionId) * 10) > 109) {
                return selectedShipSectionId + 1;
            } else if (currentSquareNumber + ((draggedShipLength - selectedShipSectionId) * 10) > 99) {
                return selectedShipSectionId;
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -30) {
                return selectedShipSectionId - 4;
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -20) {
                return selectedShipSectionId - 3;
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < -10) {
                return selectedShipSectionId - 2;
            } else if (currentSquareNumber - (selectedShipSectionId * 10) < 0) {
                return selectedShipSectionId - 1;
            } else {
                return selectedShipSectionId;
            }
        }
    }

    function dragStart() {
        draggedShip = this
        draggedShipLength = this.childNodes.length
    }

    function dragOver(e) {
        e.preventDefault()

        let currentSelectedShipSectionId = checkEdges(parseInt(this.dataset.id), selectedShipSectionId);
        // console.log(currentSelectedShipSectionId, 'asdasda');
        // let currentSelectedShipSectionId = selectedShipSectionId;

        for (let i = 0; i < draggedShipLength; i++) {
            let squareNumber;

            if (isHorizontal) {
                squareNumber = parseInt(this.dataset.id) - currentSelectedShipSectionId + i;
            } else if (!isHorizontal) {
                squareNumber = parseInt(this.dataset.id) + ((i - currentSelectedShipSectionId) * 10);
            }

            squares[squareNumber].classList.add('drag-over');
            overSquares.push(squareNumber);
        }
    }
    
    // function dragEnter(e) {
    //     e.preventDefault()

    //     if (isHorizontal) {
    //         for (let i = 0; i < draggedShipLength; i++) {
    //             squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.add('drag-over')
    //         }
    //     } else if (!isHorizontal) {
    //         for (let i = 0; i < draggedShipLength; i++) {
    //             squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.add('drag-over')
    //         }
    //     }
    // }
    
    function dragLeave(e) {
        clearOver();
    }

    // Logic gaps to fix: ship edge wrapping and ship placement stacking
    function dragDrop() {
        // if (isHorizontal) {
        //     for (let i = 0; i < draggedShipLength; i++) {
        //         squares[parseInt(this.dataset.id) - selectedShipSectionId + i].classList.remove('drag-over')
        //     }
        // } else if (!isHorizontal) {
        //     for (let i = 0; i < draggedShipLength; i++) {
        //         squares[parseInt(this.dataset.id) - selectedShipSectionId + 10 * i].classList.remove('drag-over')
        //     }
        // }
        clearOver();
        console.log(this.classList.contains('right-edge'))
        
        let currentSelectedShipSectionId = checkEdges(parseInt(this.dataset.id), selectedShipSectionId);

        for (let i = 0; i < draggedShipLength; i++) {
            let squareNumber;
            let orientation;
            
            if (isHorizontal) {
                orientation = 'horizontal';
                squareNumber = parseInt(this.dataset.id) - currentSelectedShipSectionId + i;
            } else if (!isHorizontal) {
                orientation = 'vertical';
                squareNumber = parseInt(this.dataset.id) + ((i - currentSelectedShipSectionId) * 10);
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
    
    function dragEnd() {
        console.log('dragend')
    }
}
