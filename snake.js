let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [
    { x: 12, y: 14 }
]
let food = { x: 6, y: 7 }
let score = 0;
//game functionconst
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    //If you bump into yourself
    for(let i = 1; i < snakeArr.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
}

function gameEngine() {
    //part 1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
       // musicSound.play();
        inputDir = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
       // musicSound.play();
        score = 0;
    }

//If you jave eaten the food, increment the score and regenerate the food. 
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score+=1;
    if(score>highScoreValue){
        highScoreValue = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreValue));
        highscorebox.innerHTML = "High Score: " + highScoreValue;
    }
    scoreBox.innerHTML = "Score: "+ score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y:snakeArr[0].x + inputDir.y });
    let a = 2;
    let b = 16;
    food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random()) }
}
//Moving the snake
for(let i=snakeArr.length - 2; i >=0; i--){
    
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

    //part 2: display the sname and food
    //Display the snake
    
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
       
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
 
}



//main logic
let highScore = localStorage.getItem('highscore');
if(highScore === null){
    highScoreValue = 0;
    localStorage.setItem("highscore", JSON.stringify(highScoreValue))
}
else{
    highScoreValue = JSON.parse(highScore);
    highscorebox.innerHTML = "High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    }
    })
