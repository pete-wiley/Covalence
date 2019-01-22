// 99 lines of code js

//-----------------------------------------------------------------------
//setting variables to be used throughout code

//pull run button from html
let runButton = document.querySelectorAll(".run")
//pull button to swap between test names and user inputted names from html
let swapButton = document.querySelectorAll(".swap-button")
//pull names source status indicator from html
let namesStatus = document.getElementById("names-status")
//pull text field from html
let textField = document.getElementById("text-field")
//pull submit button from html
let submit = document.getElementById("submit")
//pull reset button from html
let resetList = document.querySelectorAll(".reset")
//array of test names
let testFriends = ["a", "b", "c", "d", "e"]
//empty array where user inputted names will be added
let userFriends = []

//-----------------------------------------------------------------------
//listening for clicks and calling functions

//if runButton is clicked, call run
runButton.forEach(function (x) {
    x.addEventListener("click", run)
})

//if swapButton is clicked, call swapClicked
swapButton.forEach(function (e) {
    e.addEventListener("click", swapClicked)
})

//if resetList button is clicked, call resetClicked
resetList.forEach(function (y) {
    y.addEventListener("click", resetClicked)
})

//if submit button is clicked, call submitClicked
submit.addEventListener("click", submitClicked)

//-----------------------------------------------------------------------
//functions

//when submit button is clicked...
function submitClicked() {
    //if we are using "your names"...
    if (namesStatus.textContent == "Names: Yours") {
        //and if the text field is not blank...
        if (textField.value != "") {
            //push the content of the text field to the userFriends array
            userFriends.push(textField.value)
            //reset the text field back to blank
            textField.value = ""
            //and console.log your friends list as it is
            console.log("Your List: " + userFriends)
        //if the text field is blank...
        } else if (textField.value == "") {
            //display an alert say that the text field cant be blank
            alert("Error: Not a valid input; text field cannot be blank")
        } 
    //otherwise... (if you have the current names list set to the test names list)
    } else {
        //alert to let the user know to change the names list being used (I know the whole user input thing couldve been done better, just started working, didnt think that far ahead, started crunching on time)
        alert("Error: To use your own names, click the 'Use your own names' button")
    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//when run button is clicked...
function run() {
    //if you are using test names
    if (namesStatus.textContent == "Names: Test") {
        //run this loop for the length of the test names array:
        for (i = 0; i < testFriends.length; i++) {
            //make current friend the friend the loop is currently on 
            var curFriend = testFriends[i]
            //console.log the current friend and a colon
            console.log(curFriend + ":")
            //run this loop from 99 down to 3 (after that, the lyrics would no longer be grammatically correct):
            for (j = 99; j > 2; j--) {
                //minusOne is j (how many lines we have left to go) - 1
                minusOne = j - 1
                //writing lyrics for first 97 lines
                console.log(j + " lines of code in the file, " + j + " lines of code; " + curFriend + " strikes one out, clears it all out, " + minusOne + " lines of code in the file")
            }
            //writing lyrics (grammatically correct) for final two lines of lyrics
            console.log("2 lines of code in the file, 2 lines of code; " + curFriend + " strikes one out, clears it all out, 1 line of code in the file")
            console.log("1 line of code in the file, 1 line of code; " + curFriend + " strikes one out, clears it all out, no more lines of code in the file")
        }
        //otherwise... (if you are using your own names
    } else {
        //run this loop for the length of the user inputted names array:
        for (i = 0; i < userFriends.length; i++) {
            //make current friend the friend the loop is currently on
            var curFriend = userFriends[i]
            //console.log the current friend and a colon
            console.log(curFriend + ":")
            //run this loop from 99 down to 3 (after that, the lyrics would no longer be grammatically correct):
            for (j = 99; j > 2; j--) {
                //minus one is j (how many lines we have left to go) -1
                minusOne = j - 1
                //writing lyrics for first 97 lines
                console.log(j + " lines of code in the file, " + j + " lines of code; " + curFriend + " strikes one out, clears it all out, " + minusOne + " lines of code in the file")
            }
            //writig lyrics (grammatically correct) for final two lines of lyrics
            console.log("2 lines of code in the file, 2 lines of code; " + curFriend + " strikes one out, clears it all out, 1 line of code in the file")
            console.log("1 line of code in the file, 1 line of code; " + curFriend + " strikes one out, clears it all out, no more lines of code in the file")
        }
    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//when the swap button is clicked...
function swapClicked(e) {
    //if you are currently using test names...
    if (namesStatus.textContent == "Names: Test") {
        //make swapButton false
        swapButton = false
        //change text of swap button to reflect names list change
        e.target.textContent = "Click to use test names!"
        //change status indicator to reflect names list change
        namesStatus.textContent = "Names: Yours"
    //otherwise.. (if we are using user inputted names list)
    } else {
        //make swapButton true
        swapButton = true
        //change status indicator to reflect names list change
        namesStatus.textContent = "Names: Test"
        //change text of swap button to reflect names list change
        e.target.textContent = "Click to use your own names!"
    }
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//when the reset button is clicked...
function resetClicked () {
    //empty userFriends array
    userFriends = []
    //console.log userFriends array
    console.log("Your List: " + userFriends)
}