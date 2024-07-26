let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let isGameStarted = false;


//Game Start
$(document).on("keypress",()=>{
    if(isGameStarted == false){
        isGameStarted = true;
        nextSequence();
    }
})

// Game Pattern
function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    for(let i=1; i<=level; i++){
        setTimeout(oneStep,500 * i)
    } 
}

function oneStep(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    console.log(gamePattern);
}

// User click pattern
$(".btn").click((event)=>{
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


// Check answer
function checkAnswer(checkPoint){
    if(userClickedPattern[checkPoint] !== gamePattern[checkPoint]){
        animateGameOver();
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }else if(checkPoint+1 == level){
            gamePattern = [];
            userClickedPattern = [];
            setTimeout(nextSequence,1000);
        }
    }

// Animation and sounds
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColor).removeClass("pressed")
    }
    ,100);
}

function animateGameOver(){
    $("body").addClass("game-over");
    setTimeout(()=>{
        $("body").removeClass("game-over");
    },200);
}

function playSound(currentColor){
    let audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}

function startOver(){
    isGameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}