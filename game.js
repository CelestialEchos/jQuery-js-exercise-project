// alert("working");
// $("h1").text("working");
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let level = 0;
let isSequenceOver = false;

$(document).keypress(function(){

    if(started == false){

        $("h1").text("Game started");
        nextSequence();
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        started = true;

    }
    
});


$(".btn").on("click",function(event){

    if(started == true){

        let userChosenColour = event.target.id;  // memo
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);

    }else{

        alert("The game is not started");

    }
})



function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

        // console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // console.log("wrong");
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        // console.log("------");

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


function nextSequence(){

    gamePattern = [];
    userClickedPattern = [];

    level++;
    $("h1").text("Level "+ level);
    
    for(let i = 1; i<=level; i++){

        setTimeout(once,500 * i);

        function once(){
            let randomNumber = Math.floor(Math.random() * 4);
            let randomChosenColour = buttonColours[randomNumber];
            gamePattern.push(randomChosenColour);

            $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
        }
    }
}


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100);
}
