const btn = document.querySelector("button");
const h2 = document.querySelector("h2");
const gameOverScreen = document.getElementById("game-over");
const gameOverScreenContainer = document.getElementById("game-over-container");
let randomMeme = Math.floor(Math.random() * 100);

let game = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const square1 = document.getElementById("1");
const square2 = document.getElementById("2");
const square3 = document.getElementById("3");
const square4 = document.getElementById("4");
const square5 = document.getElementById("5");
const square6 = document.getElementById("6");
const square7 = document.getElementById("7");
const square8 = document.getElementById("8");
const square9 = document.getElementById("9");

const squares = [
  square1,
  square2,
  square3,
  square4,
  square5,
  square6,
  square7,
  square8,
  square9,
];

let currentPlayer = 1;

squares.forEach((el, index) => {
  el.addEventListener("click", () => {
    if (currentPlayer % 2 == 1 && !game[index]) {
      const imgCircle = document.createElement("img");
      imgCircle.setAttribute("src", "/images/circle.svg");
      el.appendChild(imgCircle);
      game[index] = 1;
      currentPlayer++;
      checkIfWin("O");
    } else if (currentPlayer % 2 == 0 && !game[index]) {
      const imgCross = document.createElement("img");
      imgCross.setAttribute("src", "/images/x-lg.svg");
      el.appendChild(imgCross);
      game[index] = 2;
      currentPlayer++;
      checkIfWin("X");
    }
    console.log(game);
  });
});

const playerWins = (player) => {
  gameOverScreen.classList.remove("hidden");

  if (player === "draw") {
    h2.textContent = `It's a draw!`;
  } else {
    h2.textContent = `Player ${player} wins!`;
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        let link = data.data.memes[randomMeme].url;
        const image = document.createElement("img");
        image.setAttribute("src", link);
        gameOverScreenContainer.appendChild(image);
      });
  }
};

btn.addEventListener("click", (e) => {
  gameOverScreen.classList.add("hidden");
  const img = document.querySelectorAll("img");
  currentPlayer = 1;
  game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  img.forEach((el) => el.remove("img"));
  randomMeme = Math.floor(Math.random() * 100);
});

function checkIfWin(player) {
  if (
    (game[0] == 1 && game[1] == 1 && game[2] == 1) ||
    (game[0] == 2 && game[1] == 2 && game[2] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[3] == 1 && game[4] == 1 && game[5] == 1) ||
    (game[3] == 2 && game[4] == 2 && game[5] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[6] == 1 && game[7] == 1 && game[8] == 1) ||
    (game[6] == 2 && game[7] == 2 && game[8] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[0] == 1 && game[3] == 1 && game[6] == 1) ||
    (game[0] == 2 && game[3] == 2 && game[6] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[1] == 1 && game[4] == 1 && game[7] == 1) ||
    (game[1] == 2 && game[4] == 2 && game[7] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[2] == 1 && game[5] == 1 && game[8] == 1) ||
    (game[2] == 2 && game[5] == 2 && game[8] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[0] == 1 && game[4] == 1 && game[8] == 1) ||
    (game[0] == 2 && game[4] == 2 && game[8] == 2)
  ) {
    playerWins(player);
  }
  if (
    (game[2] == 1 && game[4] == 1 && game[6] == 1) ||
    (game[2] == 2 && game[4] == 2 && game[6] == 2)
  ) {
    playerWins(player);
  }
  if (game.every((el) => el >= 1)) {
    playerWins("draw");
  }
}
