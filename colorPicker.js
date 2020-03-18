//make a variable to store and track the value; to be used in the hard and easy mode
let numSquares = 6;
let colors = generateRandomColorsArr(numSquares);
console.log(colors)
let squares = document.querySelectorAll(".square");
//This colorToGuess variable saves the result of the function guessThisColor()
//the guessThisColor function returns colors[randomNum]; randomNum is a random number and use as index to access the colors array
let colorToGuess = guessThisColor();
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetBtn = document.querySelector("#reset");
let h1 = document.querySelector("h1");
// let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let modeBtns = document.getElementsByClassName("mode");

init();
function init(){
    hardBtn.classList.add("selected");
    setUpModeBtns();
    setUpSquares();
    reset();
}

resetBtn.addEventListener("click", function(){
    reset();
    messageDisplay.textContent="Click on the boxes below to get the RGB";
    h1.style.backgroundColor = "steelblue";
    this.textContent = "New Colors"
    
})

function setUpModeBtns(){
 //MODE BUTTONS
 for(let i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function(){
        removeSelectedClass();
        this.classList.add("selected");
        if(modeBtns[i].textContent === "LESS") {
            numSquares = 3;
        } else if(modeBtns[i].textContent === "MORE") {
            numSquares = 6;
        }
        reset();
        }) 
    }
}

function setUpSquares() {
  //fill in the squares with colors
  for(let i = 0; i < squares.length; i++) {
    //add event listener
    squares[i].addEventListener("click", function(){
        removeSelectedSquare();
        let clickedColor = this.style.backgroundColor;
        colorDisplay.textContent = clickedColor;
        h1.style.backgroundColor = clickedColor;
        this.classList.add("selectedSquare");
    });
};


}
//FUNCTION TO CHANGE THE COLORS OF THE SQUARES IF CORRECT
function changeColors(color){
    for( let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].style.boxShadow = "2px 0px 5px 2px rgb(15, 15, 15)";    
    }
}

//FUNCTION TO GET A RANDOM NUMBER AND USE IT AS AN INDEX TO ACCESS THE COLORS ARRAY
//USE THE COLORS.LENGTH AS THE MAXIMUM NUMBER
function guessThisColor() {
   let randomNum = Math.floor( Math.random()* colors.length);
   return colors[randomNum];
}

//generate random colors array
function generateRandomColorsArr(numOfColorsDisplay) {
    let arr = [];
    for (let i = 0; i < numOfColorsDisplay; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgbText =  "rgb(" + r + ", " + g + ", " + b + ")"
    return rgbText;
}

//TO REMOVE THE SELECTED CLASS ON THE BUTTON    S
function removeSelectedClass(){
    for(let i = 0; i < modeBtns.length; i++) {
        modeBtns[i].classList.remove("selected");
    }
}

function removeSelectedSquare(){
    for(let i = 0; i < squares.length; i++) {
    squares[i].classList.remove("selectedSquare");
    }
}

function reset() {
    colors = generateRandomColorsArr(numSquares);
    console.log(colors)
    colorToGuess = guessThisColor();
    // colorDisplay.textContent = colorToGuess;
    for(let i = 0; i < squares.length; i++) {
        if(colors[i]){
            //add initial colors to squares
            squares[i].style.display = "inline-block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    removeSelectedSquare();
    colorDisplay.textContent = "";
    messageDisplay.textContent="Click on the boxes below to get the RGB";
    h1.style.backgroundColor = "#232323";
    this.textContent = "New Colors"
}