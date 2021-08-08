
var buttonColors = ["red", "blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = false;

var level = 0;


$(document).keypress(function(){
    if(!gameStart){        
        nextSequence();
    }
    gameStart = true;
});


$(".btn").click(function(){

    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);

});


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(name){
    $("#" + name).addClass("pressed");
    setTimeout(() => {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 500);
        startOver();
    }

}

function startOver(){
    gamePattern = [];
    level = 0;
    gameStart = false;
}





