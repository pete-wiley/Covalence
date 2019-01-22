//tic tac toe js

//--------------------------------------------------------------------------------------------------------------------------------------------
//setting variables to be used throughout js

//pulls everything with a class of cell from html
let jscells = document.querySelectorAll(".cell")
//pulls cpu player toggle button from html
let cpuToggle = document.querySelectorAll(".cpu-toggle")
//pulls reset button from html
let resetButton = document.querySelectorAll(".reset")
//establishes initial current player symbol
let currentPlayerSymbol = "X"
//draw counter up here so it doesnt reset every time winCheck(where drawCounter is stored) is called (on every click inside any jscells)
let drawCounter = 0
//pulls p2 status from html
let p2Display = document.getElementById("p2-status")
//all possible winning board positions
let winSpace = [
    [jscells[0], jscells[1], jscells[2]],
    [jscells[3], jscells[4], jscells[5]],
    [jscells[6], jscells[7], jscells[8]],
    [jscells[0], jscells[3], jscells[6]],
    [jscells[1], jscells[4], jscells[7]],
    [jscells[2], jscells[5], jscells[8]],
    [jscells[0], jscells[4], jscells[8]],
    [jscells[6], jscells[4], jscells[2]],
]
//--------------------------------------------------------------------------------------------------------------------------------------------
//listening to clicks on clickable elements

//for every cell...
jscells.forEach(function (cell) {
    //listen for a click, then call cellClicked
    cell.addEventListener("click", cellClicked)
})
//for the reset button...
resetButton.forEach(function (r) {
    //listen for a click, then call resetClicked
    r.addEventListener("click", resetClicked)
})
//for computer toggle...
cpuToggle.forEach(function (c) {
    //listen for a click, then call cpuOn
    c.addEventListener("click", cpuOn)
})

//--------------------------------------------------------------------------------------------------------------------------------------------
//functions

//function that tells what happens when a cell is clicked
function cellClicked(e) {
    //if the target (the cell that was clicked) is blank (prevents changing x's to o's)...
    if (e.target.innerHTML == " ") {
        //make the target's (the clicked cell's) text content the current player symbol
        e.target.textContent = currentPlayerSymbol;
        //this adds to the draw counter
        jscells.forEach(function (cell) {
            //if a cell is not blank...
            if (cell.textContent != " ") {
                //call winCheck
                winCheck()
                /*add to the draw counter (small issue here, on each click, it checks EVERY cell and for each cell adds 1 to the draw counter, even ones that 
                have been accounted for before, this is why a tie is when the counter hits 45, not 9)*/
                drawCounter++
            }
        })
        //if the current player symbol is x...
        if (currentPlayerSymbol == "X") {
            //make the current player symbol o...
            currentPlayerSymbol = "O"
            //otherwise (if its o), change it back to x
        } else {
            currentPlayerSymbol = "X"
        }
        //calls cpuPlay but only if the last move in a draw game has not been made yet
        if (drawCounter != 36) {
            cpuPlay()
        }

    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//function that checks to see if the game has been won (or tied)
function winCheck() {
    //this loop runs to the length of winSpace (which would be 8, since there are 8 winning board positions/8 smaller arrays)
    for (var i = 0; i < winSpace.length; i++) {
        //establishes counter variable and on each click resets to 0
        counter = 0
        //let winPos (the number of winning board positions) equal the length of winSpace
        let winPos = winSpace[i].length
        //this loop goes through the elements (jscells) in all the arrays of win positions
        for (var j = 0; j < winPos; j++) {
            //winCell equals the text content of winSpace[i][j] (goes to winSpace, through each row(i) and looks inside at jscells(j))
            winCell = winSpace[i][j].textContent
            //if the text content of winCell is the same as the current player symbol...
            if (winCell == currentPlayerSymbol) {
                console.log(counter)//!!!!!!!!!!!!!!!!!!!!!!!!
                //add to the counter
                counter++
                //if the counter reaches 3 (3 in a row)...
                if (counter == 3) {
                    //alert the winner...
                    alert(currentPlayerSymbol + " wins!")
                    //and reset the board
                    jscells.forEach(function (cell) {
                        //make all cells blank
                        cell.textContent = " "
                        //set current player symbol to o (because after winCheck is finished running, in cellClicked, it will change o back to x before cellClicked is completed)
                        currentPlayerSymbol = "O"
                        //set the draw counter back to 0
                        drawCounter = 0
                    })
                    /*if 9 cells have been filled and theres no winner (line 40 for explanation as to why this runs if the drawCounter is at 45)...*/
                } else if (drawCounter == 45 && counter != 3) {
                    //alert that its a draw...
                    alert("Draw game!")
                    //reset draw counter to 0...
                    drawCounter = 0
                    //and reset the board
                    jscells.forEach(function (cell) {
                        //make all cells blank
                        cell.textContent = " "
                        //set current player symbol to o (because after winCheck is finished running, in cellClicked, it will change o back to x before cellClicked is completed)
                        currentPlayerSymbol = "O"
                    })
                }
            }
        }
    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//what happens when the reset button is clicked
function resetClicked(e) {
    jscells.forEach(function (cell) {
        //make all cells blank
        cell.textContent = " "
        //make current player symbol x
        currentPlayerSymbol = "X"
        //reset draw counter
        drawCounter = 0
    })
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//what happens when the player 2 toggle is clicked
function cpuOn(c) {
    //if the toggle is false... (it is true by default)
    if (cpuToggle == false) {
        //make it true
        cpuToggle = true
        //change the p2 display to show that p2 is human
        p2Display.textContent = "P2: Human"
        //change the button to ask if you would like to play against a computer
        c.target.textContent = "Play against computer?"
        //otherwise... (if it is true, this happens on first click)
    } else {
        //make it false
        cpuToggle = false
        //change the p2 display to show that p2 is a computer
        p2Display.textContent = "P2: Computer"
        //change the button to ask if you would like to play against a human
        c.target.textContent = "Play against human?"
    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//how the computer makes a move at random
function cpuPlay() {
    //if cpuToggle is false... (if computer p2 is engaged)
    if (cpuToggle == false) {
        //as long as the current player symbol is o...
        while (currentPlayerSymbol == "O") {
            //pick a random cell and call it cpuCell
            var cpuCell = jscells[Math.floor(Math.random() * jscells.length)];
            //if cpuCell happens to be blank... (if it isnt, the while loop causes it to try for a blank cell until it finds one)
            if (cpuCell.textContent == " ") {
                //set the text content of cpuCell to the current player symbol.. (which would be o)
                cpuCell.textContent = currentPlayerSymbol
                /*check for a win by the computer (winCheck here again; winCheck in cellClicked wont see computer win because there winCheck is called only when a cell is clicked; when the computer makes a move, nothing is being clicked; without winCheck here, the computer 
                    could win the game without winCheck in cellClicked even noticing, because winCheck compares the text content of cells in winSpace to the currentPlayerSymbol, and whenever theres a click when p2 is the computer, the currentPlayerSymbol THEN 
                    would only be x whenever there is a click; if i moved winCheck in cellClicked below where the currentPlayerSymbol swaps, it would no longer accurately check for wins, since it would be checking the moves of the other player after you make a move)*/
                winCheck()
                //sets current player symbol back to x since cellClicked wont be activated after a computer move
                currentPlayerSymbol = "X"
                // and change the current playter symbol back to x to wait for p1 move
                jscells.forEach(function (cell) {
                    //if a cell is not blank...
                    if (cell.textContent != " ") {
                        //add to the draw counter (small issue here, on each click, it checks EVERY cell and for each cell adds 1 to the draw counter, even ones that have been accounted for before, this is why a tie is when the counter hits 45, not 9)
                        drawCounter++
                    }
                })
            //if the draw counter reaches 36...
            } else if (drawCounter == 36) {
                //there is only one move left to be made, and cpuPlay should be stopped; otherwise, the while loops runs perpetually and causes the page to freeze/crash
                break
            }
        }
    }
}