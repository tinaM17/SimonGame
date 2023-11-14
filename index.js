// select all the action buttons
const startbtn=document.querySelector('#startbtn')
const onBtn=document.querySelector('#on')
const offBtn=document.querySelector('#off')
const countbtn=document.querySelector('#countbtn')

//select all the color buttons
const redBtn=document.querySelector('#red')
const yellowBtn=document.querySelector('#yellow')
const blueBtn=document.querySelector('#blue')
const greenBtn=document.getElementById("green")

//Select all the audio sounds to play
const soundGreen=document.querySelector('#soundbuttonGre')
const soundBlue=document.getElementById('soundbuttonBlu')
const soundRed=document.getElementById('soundbuttonRed')
const soundYellow=document.getElementById('soundbuttonYel')


//boolean values to start our game

let start=false
let on=false
let off=true
let count;
let userArray=[]
let memoryArray=[]
let intervalId;
let win
let compTurn
let flash
let good
let noise=true

// First our start button will be disabled as game is off
startbtn.setAttribute('disabled','')


//Add a on click listener on the onBtn, when it is clicked change the background color and remove the disabled property from the startBtn
// As now we can start our game
onBtn.addEventListener('click',(e)=>{
    onBtn.style.backgroundColor='blue';
    offBtn.style.backgroundColor='#908c8a';
    on=true;
    off=false;
    startbtn.removeAttribute('disabled','')
})

// Also add a on click listener on off button to off the our game and again disabled our start button because game is off
offBtn.addEventListener('click',(e)=>{
    offBtn.style.backgroundColor='blue';
    onBtn.style.backgroundColor='#908c8a';
    on=false;
    off=true;
    startbtn.setAttribute('disabled','')
    startbtn.style.backgroundColor='red'
})

// Now add a on click listener on the startBtn. when it is clicked it checks first if on button is true and start is false then it makes the start button true and change it's color, if start is already true then after clicking it makes false to the start button
startbtn.addEventListener('click',(e)=>{
    if(on && start===false || win){
        startbtn.style.backgroundColor='green'
        start=true
        newGame();
    }
    else if(on && start===true){
        startbtn.style.backgroundColor='red'
        start=false
    }
})

// Now start the game 
function newGame() {
    userArray=[];
    memoryArray=[];
    intervalId=0;
    count=1;
    win=false;
    flash=0
    good=true
    countbtn.innerHTML="_1";
    for(i=0;i<20;i++){
        memoryArray.push(Math.floor(Math.random()*4)+1);
    }
    compTurn=true;
    intervalId=setInterval(gameTurn,800);

}

function gameTurn() {
    on=false;
    if(flash===count){
      clearInterval(intervalId);
      compTurn=false;
      clearColor();
      on=true;
    }
    if(compTurn){
        clearColor();
        setTimeout(()=>{
            if (memoryArray[flash] == 1) one();
            if (memoryArray[flash] == 2) two();
            if (memoryArray[flash] == 3) three();
            if (memoryArray[flash] == 4) four();
            flash++;
        },200)
    }
}

function one() {
    if(noise){
        soundGreen.play();
    }
    noise=true
    greenBtn.style.backgroundColor = "lightgreen";
  }
  
  function two() {
    if(noise){
        soundRed.play()
    }
    noise=true
    redBtn.style.backgroundColor = "tomato";
  }
  
  function three() {
    if(noise){
        soundYellow.play()
    }
    noise=true
    yellowBtn.style.backgroundColor = "yellow";
  }
  
  function four() {
    if(noise){
        soundBlue.play()
    }
    noise=true
    blueBtn.style.backgroundColor = "lightskyblue";
  }

  function clearColor() {
    greenBtn.style.backgroundColor = "green";
    redBtn.style.backgroundColor = "red";
    yellowBtn.style.backgroundColor = "goldenrod";
    blueBtn.style.backgroundColor = "blue";
  }

  function flashColor() {
    greenBtn.style.backgroundColor = "lightgreen";
    redBtn.style.backgroundColor = "tomato";
    yellowBtn.style.backgroundColor = "yellow";
    blueBtn.style.backgroundColor = "lightskyblue";
  }

  greenBtn.addEventListener('click', (event) => {
    if (on) {
      userArray.push(1);
      check();
      one();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  redBtn.addEventListener('click', (event) => {
    if (on) {
      userArray.push(2);
      check();
      two();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  yellowBtn.addEventListener('click', (event) => {
    if (on) {
      userArray.push(3);
      check();
      three();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  blueBtn.addEventListener('click', (event) => {
    if (on) {
      userArray.push(4);
      check();
      four();
      if(!win) {
        setTimeout(() => {
          clearColor();
        }, 300);
      }
    }
  })
  
  function check() {
    if (userArray[userArray.length - 1] !== memoryArray[userArray.length - 1])
      good = false;
  
    if (userArray.length == 5 && good) {
      winGame();
    }
  
    if (good == false) {
      flashColor();
      countbtn.innerHTML = "NO!";
      setTimeout(() => {
        countbtn.innerHTML = count;
        clearColor();
          compTurn = true;
          flash = 0;
          userArray = [];
          good = true;
          intervalId = setInterval(gameTurn, 800);
      }, 800);
  
      noise = false;
    }
  
    if (count == userArray.length && good && !win) {
      count++;
      userArray = [];
      compTurn = true;
      flash = 0;
      countbtn.innerHTML = count;
      intervalId = setInterval(gameTurn, 800);
    }
  
  }
  
  function winGame() {
    flashColor();
    countbtn.innerHTML = "WIN!";
    on = false;
    win = true;
  }
