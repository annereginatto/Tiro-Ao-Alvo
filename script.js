var screen = document.querySelector("#screen");
var brush = screen.getContext("2d");

var radius = 10;

function drawCircle(x, y, radius, color) {
    brush.fillStyle = color;
    brush.beginPath();
    brush.arc(x, y, radius, 0, 2 * Math.PI);
    brush.fill();
}

//Desenhando o alvo;
function drawDart(x, y) {
    drawCircle(x, y, radius + 20, "red");
    drawCircle(x, y, radius + 10, "white");
    drawCircle(x, y, radius, "red");
}

//Sorteio aleatório da posição x e y do alvo;
function dartPosition(max) {
    return Math.floor(Math.random() * max);
    //Math.floor é parecido com Math.round, mas "arredonda o número para baixo";
}

function clearPage() {
    brush.fillRect(0, 0, 600, 400);
}

var dificulty = 1000;
function gameOn() {
    clearInterval(gameOn);
    dificulty += 200;
    var gameOn = setInterval(reloadPage, dificulty);
    dificulty += 1700;
}

//Variáveis da posição aleatória da coordenada x e y declaradas fora da função para que sejam acessíveis no escopo global - a intenção é que saibamos a posição do alvo;
var xPosition;
var yPosition;

function reloadPage() {
    if (level >= 0 && level < 10) {
        clearPage();
        brush.fillStyle = "black";
        brush.fillRect(0, 0, 600, 400);
        brush.fillStyle = "black";
        brush.fillRect(500, 0, 110, 80);
        addText("SCORE", 520, 25);
        score();
        xPosition = dartPosition(600 - (100 + (radius + 20))); //Valor máximo da posição do x;
        yPosition = dartPosition(400 - (radius + 20)); //Valor máximo da posição do y;
        if (xPosition < radius + 20) {
            xPosition = radius + 20;
        } else if (yPosition < radius + 20) {
             yPosition = radius + 20;
        }
            drawDart(xPosition, yPosition);
        } else if (level >= 10) {
            endGame();
        }
    }

var points = 0;
var level = 0;

function startGame(event) {
    //Event vê a posição do mouse;
    if (level >= 0 && level < 10) {
        gameOn();
        var x = event.pageX - screen.offsetLeft;
        var y = event.pageY - screen.offsetTop;
        if ((x > xPosition - radius) && (x < xPosition + radius) && (y < yPosition + radius) &&(y > yPosition - radius)) {
            level++;
            alert("Great shot! Now you're on level " + level);
            points++;
        } else {
            points--;
        }
    } else if (level >= 10){
        endGame();
    }
}

function addText (text, x, y) {
    brush.font = "19px Georgia";
    brush.fillStyle = "gold";
    brush.fillText(text, x, y);
}

function score() {
    brush.font ="45px Georgia"
    brush.fillStyle = "gold";
    brush.fillText(points, 538, 60);
}

function endGame() {
    clearPage();
    brush.fillStyle = "black";
    brush.fillRect(0, 0, 600, 400);
    if (points >= 2) {
        addText("Congratulations, you won the game! Your score was " + points + " points", 50, 200);
    } else if (points == 1) {
        addText("Congratulations, you won the game! Your score was " + points + " point", 50, 200);
    } else if (points == 0) {
        addText("Good job! You finished with no points, but you still won the game :)", 18, 200);
    } else if (points < 0) {
        addText("You lost the game :(... try again!", 150, 200);
    }
}

screen.onclick = startGame;

reloadPage();
//Define a execução de uma função num intervalo de tempo e executa a função novamente;
//setTimeout() define um intervalo de tempo para executar a função uma única vez, assim que o intervalo acabar;