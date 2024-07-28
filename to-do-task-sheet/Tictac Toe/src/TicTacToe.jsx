import React, { useState, useEffect } from "react"; // Assuming your CSS file is in the src directory

const TicTacToe = () => {
  const [playerOneChoices, setPlayerOneChoices] = useState([]);
  const [playerTwoChoices, setPlayerTwoChoices] = useState([]);
  const [playerOneScore, setPlayerOneScore] = useState(
    Number(sessionStorage.getItem("p1Score")) || 0
  );
  const [playerTwoScore, setPlayerTwoScore] = useState(
    Number(sessionStorage.getItem("p2Score")) || 0
  );
  const [tieScore, setTieScore] = useState(
    Number(sessionStorage.getItem("tieScore")) || 0
  );
  const [clickCounter, setClickCounter] = useState(0);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState("X");

  const boxes = Array.from({ length: 9 }, (_, i) => i + 1);

  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  useEffect(() => {
    sessionStorage.setItem("p1Score", playerOneScore);
    sessionStorage.setItem("p2Score", playerTwoScore);
    sessionStorage.setItem("tieScore", tieScore);
  }, [playerOneScore, playerTwoScore, tieScore]);

  const checkForWinner = (choices) => {
    return winningPatterns.some((pattern) =>
      pattern.every((number) => choices.includes(number))
    );
  };

  const handleBoxClick = (number) => {
    console.log(winner, number);
    if (
      winner ||
      playerOneChoices.includes(number) ||
      playerTwoChoices.includes(number)
    )
      return;

    const newPlayerChoices =
      turn === "X"
        ? [...playerOneChoices, number]
        : [...playerTwoChoices, number];

    if (turn === "X") {
      setPlayerOneChoices(newPlayerChoices);
      setTurn("O");
    } else {
      setPlayerTwoChoices(newPlayerChoices);
      setTurn("X");
    }

    setClickCounter((prev) => prev + 1);

    if (newPlayerChoices.length >= 3) {
      if (checkForWinner(newPlayerChoices)) {
        setWinner(turn === "X" ? "Player One" : "Player Two");
        turn === "X"
          ? setPlayerOneScore((prev) => prev + 1)
          : setPlayerTwoScore((prev) => prev + 1);
      } else if (clickCounter === 8) {
        setWinner("Tie");
        setTieScore((prev) => prev + 1);
      }
    }
  };

  const restartGame = () => {
    console.log("restartGame", winner);
    setPlayerOneChoices([]);
    setPlayerTwoChoices([]);
    setClickCounter(0);
    setWinner(null);
    setTurn("X");
  };

  const clearScores = () => {
    sessionStorage.clear();
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setTieScore(0);
  };

  return (
    <main>
      <div className="top">
        <div className="exAndOh">
          <i className="fa-solid fa-x"></i>
          <i className="fa-solid fa-o"></i>
        </div>
        <section className="turn">
          <h3 id="colorChange">
            <i
              className={`fa-solid ${turn === "X" ? "fa-x" : "fa-o"}`}
              id="turn"
            ></i>{" "}
            TURN
          </h3>
        </section>
        <div>
          <button className="clearScore" id="clear-score" onClick={clearScores}>
            Wipe Score
          </button>
        </div>
      </div>
      <div className="middle">
        <ul>
          {boxes.map((number) => (
            <li
              key={number}
              className="box"
              id={number}
              onClick={() => handleBoxClick(number)}
            >
              {playerOneChoices.includes(number)
                ? "X"
                : playerTwoChoices.includes(number)
                ? "O"
                : ""}
            </li>
          ))}
        </ul>
      </div>
      <div className="bottom">
        <ul>
          <li className="player-one-score">
            <p>X(Player 1)</p>
            <span id="player-one-score">{playerOneScore}</span>
          </li>
          <li className="tie-score">
            <p>TIES</p>
            <span id="tie-score">{tieScore}</span>
          </li>
          <li className="player-two-score">
            <p>O(Player 2)</p>
            <span id="player-two-score">{playerTwoScore}</span>
          </li>
        </ul>
      </div>
      <div
        className={`winner ${winner ? "show-winner" : ""}`}
        id="winner-declaration"
      >
        <h4 id="winner-text">{winner && `The winner is ${winner}`}</h4>
        {winner && (
          <button
            className="restart-after-win"
            id="restart-after-win"
            onClick={restartGame}
          >
            Play again :)
          </button>
        )}
      </div>
    </main>
  );
};

export default TicTacToe;
