let playerX = 0;
let playerY = 0;
let thingX = 0;
let thingY = 0;
let enemyX = 0;
let enemyY = 0;
let score = 0;

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
    } if (playerX > 780) {
        player.style.left = 780;
        playerX = 780;
    } if (playerY < 0) {
        player.style.top = 0;
        playerY = 0;
    } if (playerY > 580) {
        player.style.top = 580;
        playerY = 580;
    } if (enemyX < 0) {
        enemy.style.left = 0;
        enemyX = 0;
    } if (enemyX > 780) {
        enemy.style.left = 780;
        enemyX = 780;
    } if (enemyY < 0) {
        enemy.style.top = 0;
        enemyY = 0;
    } if (enemyY > 580) {
        enemy.style.top = 580;
        enemyY = 580;
    }
}
function checkTouch() {
    if (playerX / 20 == thingX && playerY / 20 == thingY) {
        score++;
        document.getElementById("score").innerText = score;
        placeRedThing();
    }
    if (playerX == enemyX && playerY == enemyY) {
        initGame();
    }
    if (thingX == enemyX / 20 && thingY == enemyY / 20) {
        placeRedThing();
        placeEnemy();
    }
} 
function keyEventListener(event) {
    switch (event.key) {
        case "a":
            moveEntity(-20, 0);
            break;
        case "d":
            moveEntity(20, 0);
            break;
        case "w":
            moveEntity(0, -20);
            break;
        case "s":
            moveEntity(0, 20);
            break;
        default:
            return;
    }
    checkPos();
    moveEnemy();
    checkTouch();
}

function placeRedThing() {
    thingX = Math.round(Math.random() * 39);
    thingY = Math.round(Math.random() * 29);
    const thing = document.getElementById("thing");
    thing.style.top = thingY * 20;
    thing.style.left = thingX * 20;
}
function placeEnemy() {
    enemyX = Math.round(Math.random() * 39) * 20;
    enemyY = Math.round(Math.random() * 29) * 20;
    if (playerX == enemyX && playerY == enemyY) {
        placeEnemy();
    }
    const enemy = document.getElementById("enemy");
    enemy.style.top = enemyY;
    enemy.style.left = enemyX;
}
function moveEnemy() {
    if(Math.round(Math.random() * 19) >= 10) {
        if (playerX < enemyX) {
            changeEnemyPosBy(-20, 0);
        } else if (playerY > enemyY) {
            changeEnemyPosBy(0, 20);
        } else if (playerY < enemyY) {
            changeEnemyPosBy(0, -20);
        } else if (playerX > enemyX) {
            changeEnemyPosBy(20, 0);
        }
    }
}
function initGame() {
    placeRedThing();
    placeEnemy();
    score = 0;
    document.getElementById("score").innerText = "0";
}