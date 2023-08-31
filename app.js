let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let startBtn = document.querySelector("#start");

startBtn.addEventListener("click", function () {
    if (started == false) {
        started = true;

        levelUp();
    }
});


//restart button
function reStart() {
    reStartBtn = document.createElement("button");
    reStartBtn.innerText = "ReStart Game";
    reStartBtn.classList.add("reStart");

    h2.appendChild(reStartBtn);

    // Add a click event listener
    reStartBtn.addEventListener("click", function () {
        reset();

        started = true;
        levelUp();
    })};


//keyboard press for start game
document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;

        levelUp();
    };
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
};

function highScore(score) {
    if (highestScore < score) {
        highestScore = score;
    };
    return highestScore;
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Your Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);//generate random number btw 0 to 3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);

    // audio
    var audio = document.getElementById("gameFlash");
    audio.play();

    gameSeq.push(randColor);// random color pushing in array
    h3.innerText = `Your higest score is : ${highScore(level)} .`;
};

//check ans one by one
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        };
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press any key to start. or `;
        reStart();

        // audio
        var audio = document.getElementById("warn");
        audio.play();

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 350);
        reset();
    };
};

function btnPress() {
    let btn = this;
    btnFlash(btn);

    // audio
    var audio = document.getElementById("divBtn");
    audio.play();

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);//store user colour by id name in array

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
};


//reset the game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}