let playerX = 0;
let playerY = 0;
let thingX = 0;
let thingY = 0;
let enemyX = 0;
let enemyY = 0;
let score = 0;
let difSettings = 10;

function movePlayer(x, y) {
    const player = document.getElementById("player");
    player.style.top = playerY + y;
    playerY = playerY + y;
    player.style.left = playerX + x;
    playerX = playerX + x;
}
function changeEnemyPosBy(x, y) {
    const enemy = document.getElementById("enemy");
    enemy.style.top = enemyY + y;
    enemyY = enemyY + y;
    enemy.style.left = enemyX + x;
    enemyX = enemyX + x;
}
function checkPos() {
    const player = document.getElementById("player");
    const enemy = document.getElementById("enemy");
    if (playerX < 0) {
        player.style.left = 0;
        playerX = 0;
    } if (playerX > 768) {
        player.style.left = 768;
        playerX = 768;
    } if (playerY < 0) {
        player.style.top = 0;
        playerY = 0;
    } if (playerY > 608) {
        player.style.top = 608;
        playerY = 608;
    } if (enemyX < 0) {
        enemy.style.left = 0;
        enemyX = 0;
    } if (enemyX > 768) {
        enemy.style.left = 768;
        enemyX = 768;
    } if (enemyY < 0) {
        enemy.style.top = 0;
        enemyY = 0;
    } if (enemyY > 608) {
        enemy.style.top = 608;
        enemyY = 608;
    }
}
function checkTouch() {
    if (playerX / 32 == thingX && playerY / 32 == thingY) {
        score++;
        document.getElementById("score").innerText = score;
        placeRedThing();
    }
    if (playerX == enemyX && playerY == enemyY) {
        initGame();
    }
    if (thingX == enemyX / 32 && thingY == enemyY / 32) {
        placeRedThing();
        placeEnemy();
    }
} 
function keyEventListener(event) {
    switch (event.key) {
        case "a":
            movePlayer(-32, 0);
            break;
        case "d":
            movePlayer(32, 0);
            break;
        case "w":
            movePlayer(0, -32);
            break;
        case "s":
            movePlayer(0, 32);
            break;
        default:
            return;
    }
    checkPos();
    moveEnemy();
    checkTouch();
}

function placeRedThing() {
    thingX = Math.round(Math.random() * 24);
    thingY = Math.round(Math.random() * 19);
    const thing = document.getElementById("thing");
    thing.style.top = thingY * 32;
    thing.style.left = thingX * 32;
}
function placeEnemy() {
    enemyX = Math.round(Math.random() * 24) * 32;
    enemyY = Math.round(Math.random() * 19) * 32;
    if (playerX == enemyX && playerY == enemyY) {
        placeEnemy();
    }
    const enemy = document.getElementById("enemy");
    enemy.style.top = enemyY;
    enemy.style.left = enemyX;
}
function moveEnemy() {
    if(Math.round(Math.random() * 19) >= difSettings) {
        if (playerX < enemyX) {
            changeEnemyPosBy(-32, 0);
        } else if (playerY > enemyY) {
            changeEnemyPosBy(0, 32);
        } else if (playerY < enemyY) {
            changeEnemyPosBy(0, -32);
        } else if (playerX > enemyX) {
            changeEnemyPosBy(32, 0);
        }
    }
}
function initGame() {
    placeRedThing();
    placeEnemy();
    score = 0;
    document.getElementById("score").innerText = 0;
}
function setDifficulty(setDifficulty) {
    switch (setDifficulty) {
        case ("Easy"):
            difSettings = 13;
            break;
        case ("Normal"):
            difSettings = 10;
            break;
        case ("Hard"):
            difSettings = 7;
            break;
        case ("Impossible"):
            difSettings = 0;
            break;
        default:
            difSettings = 10;
    }
}