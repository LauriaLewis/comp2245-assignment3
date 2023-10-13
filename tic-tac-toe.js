document.addEventListener("DOMContentLoaded", function () {
  const boardContainer = document.getElementById("board");
  const statusDiv = document.getElementById("status");

  const board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  let currentPlayer = "X";
  let gameOver = false;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = row;
      square.dataset.col = col;
      boardContainer.appendChild(square);
    }
  }

  const newGameButton = document.querySelector(".btn");
  newGameButton.addEventListener("click", function () {
    board.forEach((row) => row.fill(" "));
    squares.forEach((square) => {
      square.textContent = "";
      square.classList.remove("X", "O");
    });
    currentPlayer = "X";
    gameOver = false;

    statusDiv.textContent =
      "Move your mouse over a square and click to play an X or an O.";
    statusDiv.classList.remove("you-won");
  });

  const squares = boardContainer.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("click", function () {
      square.classList.remove("hover");
    });
  });

  squares.forEach((square) => {
    square.addEventListener("click", function () {
      if (!gameOver && square.textContent === "") {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        square.classList.add(currentPlayer);

        if (board[row][col] === " ") {
          board[row][col] = currentPlayer;
          square.textContent = currentPlayer;

          if (checkWin()) {
            statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            statusDiv.classList.add("you-won");
            gameOver = true;
          } else if (checkTie()) {
            statusDiv.textContent = "It's a tie!";
            gameOver = true;
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
          }
        }
      }
    });

    square.addEventListener("mouseover", function () {
      if (!gameOver && square.textContent === "") {
        square.classList.add("hover");
      }
    });

    square.addEventListener("mouseleave", function () {
      if (!gameOver && square.textContent === "") {
        square.classList.remove("hover");
      }
    });
  });

  function checkWin() {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === currentPlayer &&
        board[i][1] === currentPlayer &&
        board[i][2] === currentPlayer
      ) {
        return true;
      }
      if (
        board[0][i] === currentPlayer &&
        board[1][i] === currentPlayer &&
        board[2][i] === currentPlayer
      ) {
        return true;
      }
    }
    if (
      board[0][0] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][2] === currentPlayer
    ) {
      return true;
    }
    if (
      board[0][2] === currentPlayer &&
      board[1][1] === currentPlayer &&
      board[2][0] === currentPlayer
    ) {
      return true;
    }
    return false;
  }

  function checkTie() {
    for (let row of board) {
      for (let cell of row) {
        if (cell === " ") {
          return false;
        }
      }
    }
    return true;
  }
});
