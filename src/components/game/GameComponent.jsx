import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Image, OrbitControls, Text, Float } from "@react-three/drei";
import { Rock } from "../../3d Assets/Rock.jsx";
import { Paper } from "../../3d Assets/Paper.jsx";
import { Scissors } from "../../3d Assets/Scissors.jsx";
import useGame from "../../stores/useGame.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function GameComponent() {
  const options = ["rock", "paper", "scissors"];
  const {
    player,
    setPlayer,
    computer,
    setComputer,
    winner,
    setWinner,
    mode,
    setMode,
    round,
    nextRound,
    setRound,
    resetRound,
    phase,
    setPhase,
    start,
    restart,
    end,
    playerScore,
    setPlayerScore,
    computerScore,
    setComputerScore,
    playerWinsTotal,
    setPlayerWinsTotal,
    computerWinsTotal,
    setComputerWinsTotal,
  } = useGame();

  const [limit, setLimit] = useState(null);

  useEffect(() => {
    switch (mode) {
      case "threeWins":
        setLimit(3);
        break;
      case "fiveWins":
        setLimit(5);
        break;
      case "sevenWins":
        setLimit(7);
        break;
      case "endless":
        setLimit(Infinity);
        break;
    }
  }, [mode]);

  useEffect(() => {
    if (Number(round) === 0) {
      restart();

      if (window.localStorage.getItem("phase") === "ended") {
        window.localStorage.setItem("playerScore", 0);
        window.localStorage.setItem("computerScore", 0);
        window.localStorage.setItem("phase", "ready");
      }

      setPlayer(null);
      setComputer(null);
      setWinner(null);
    }

    if (Number(round) === 1) {
      start();
      window.localStorage.setItem("phase", "playing");
    }

    if (Number(playerScore) === limit || Number(computerScore) === limit) {
      end();
      window.localStorage.setItem("phase", "ended");
      window.localStorage.setItem("round", "0");

      let walletAddress = window.localStorage.getItem("walletAddress");

      if (winner === "player") {
        setPlayerWinsTotal(String(Number(playerWinsTotal) + 1));
        window.localStorage.setItem(
          "playerWinsTotal",
          String(Number(playerWinsTotal) + 1)
        );
      } else {
        setComputerWinsTotal(String(Number(computerWinsTotal) + 1));
        window.localStorage.setItem(
          "computerWinsTotal",
          String(Number(computerWinsTotal) + 1)
        );
      }
      if (phase === "ended") {
        const gameData = {
          mode,
          rounds: round,
          winner,
          playerScore,
          computerScore,
          walletAddress,
        };

        fetch(`${BACKEND_URL}/login/store-game-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(gameData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data stored successfully:", data);
          })
          .catch((error) => {
            console.error("Error storing data:", error);
          });
      }
    }
  }, [round, playerScore, computerScore, winner, mode, phase]);

  const handleClick = (option) => {
    if (phase !== "ended") {
      nextRound();
      window.localStorage.setItem("round", String(Number(round) + 1));
      const computerOption =
        options[Math.floor(Math.random() * options.length)];

      setPlayer(option);
      setComputer(computerOption);

      if (option === computerOption) {
        setWinner("tie");
      } else if (
        (option === "rock" && computerOption === "scissors") ||
        (option === "paper" && computerOption === "rock") ||
        (option === "scissors" && computerOption === "paper")
      ) {
        setWinner("player");
        setPlayerScore(String(Number(playerScore) + 1));
        window.localStorage.setItem("playerScore", Number(playerScore) + 1);
      } else {
        setWinner("computer");
        setComputerScore(String(Number(computerScore) + 1));
        window.localStorage.setItem("computerScore", Number(computerScore) + 1);
      }
    }
  };

  const handleRestart = () => {
    restart();
    window.localStorage.setItem("phase", "ready");
    resetRound();
    window.localStorage.setItem("round", 0);
    setPlayerScore(0);
    window.localStorage.setItem("playerScore", 0);
    setComputerScore(0);
    window.localStorage.setItem("computerScore", 0);
  };

  const rock = useRef();
  const paper = useRef();
  const scissors = useRef();
  const [hovered, setHovered] = useState(false);

  const handleHover = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handleUnhover = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "default";
    }
  }, [hovered]);

  let cameraY = window.innerWidth < 600 ? 8 : 5;

  useEffect(() => {
    let storedMode = window.localStorage.getItem("mode");
    if (storedMode !== null) {
      setMode(storedMode);
    } else {
      window.localStorage.setItem("mode", "fiveWins");
    }

    let storedRound = window.localStorage.getItem("round");
    if (storedRound !== null) {
      setRound(storedRound);
    } else {
      window.localStorage.setItem("round", 0);
    }

    let storedPhase = window.localStorage.getItem("phase");
    if (storedPhase !== null) {
      if (storedPhase === "ended") {
        handleRestart();
      }
      setPhase(storedPhase);
    } else {
      window.localStorage.setItem("phase", "ready");
    }

    let storedPlayerScore = window.localStorage.getItem("playerScore");
    if (storedPlayerScore !== null) {
      setPlayerScore(storedPlayerScore);
    } else {
      window.localStorage.setItem("playerScore", 0);
    }

    let storedComputerScore = window.localStorage.getItem("computerScore");
    if (storedComputerScore !== null) {
      setComputerScore(storedComputerScore);
    } else {
      window.localStorage.setItem("computerScore", 0);
    }

    let storedPlayerWinsTotal = window.localStorage.getItem("playerWinsTotal");
    if (storedPlayerWinsTotal !== null) {
      setPlayerWinsTotal(storedPlayerWinsTotal);
    } else {
      window.localStorage.setItem("playerWinsTotal", 0);
    }

    let storedComputerWinsTotal =
      window.localStorage.getItem("computerWinsTotal");
    if (storedComputerWinsTotal !== null) {
      setComputerWinsTotal(storedComputerWinsTotal);
    } else {
      window.localStorage.setItem("computerWinsTotal", 0);
    }
  }, []);

  return (
    <div className="flex-1 w-full h-full">
      <Canvas
        className="w-full h-[calc(100vh-16rem)]"
        camera={{
          near: 0.1,
          far: 50,
          position: [0, 0, cameraY],
        }}
      >
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Rock
          ref={rock}
          position={[-2, -2.35, 0]}
          scale={[5, 5, 5]}
          onClick={() => handleClick("rock")}
          onPointerOver={handleHover}
          onPointerOut={handleUnhover}
        />
        <Paper
          ref={paper}
          position={[0, -2, 0]}
          rotation={[0, Math.PI / 4, 0]}
          onClick={() => handleClick("paper")}
          onPointerOver={handleHover}
          onPointerOut={handleUnhover}
        />
        <Scissors
          ref={scissors}
          position={[2, -2.3, 0]}
          scale={[5.5, 5.5, 5.5]}
          onClick={() => handleClick("scissors")}
          onPointerOver={handleHover}
          onPointerOut={handleUnhover}
        />

        <Float rotationIntensity={1} floatIntensity={0.25}>
          {computer && (
            <Text
              position={[0, 4, 0]}
              fontSize={0.4}
              font="./fonts/nickname.otf"
              color={0x9f7aea}
            >
              Computer chose {computer}
              {computer === "rock" && (
                <Rock ref={rock} position={[3, 0, 0]} scale={[5, 5, 5]} />
              )}
              {computer === "paper" && (
                <Paper
                  ref={paper}
                  position={[3, 0, 0]}
                  rotation={[0, Math.PI / 4, 0]}
                />
              )}
              {computer === "scissors" && (
                <Scissors
                  ref={scissors}
                  position={[3, 0, 0]}
                  scale={[5.5, 5.5, 5.5]}
                />
              )}
            </Text>
          )}

          {player && (
            <Text
              position={[0, 2.5, 0]}
              fontSize={0.4}
              font="./fonts/nickname.otf"
              color={0x9f7aea}
            >
              You chose {player}
              {player === "rock" && (
                <Rock ref={rock} position={[3, 0, 0]} scale={[5, 5, 5]} />
              )}
              {player === "paper" && (
                <Paper
                  ref={paper}
                  position={[3, 0, 0]}
                  rotation={[0, Math.PI / 4, 0]}
                />
              )}
              {player === "scissors" && (
                <Scissors
                  ref={scissors}
                  position={[3, 0, 0]}
                  scale={[5.5, 5.5, 5.5]}
                />
              )}
            </Text>
          )}

          {winner && (
            <Text
              position={[0, 1, 0]}
              fontSize={0.7}
              font="./fonts/nickname.otf"
              color={0x9f7aea}
            >
              {winner === "tie"
                ? `It is a tie!`
                : winner === "player"
                ? `You win${phase !== "ended" ? "!" : ""}`
                : `Computer wins${phase !== "ended" ? "!" : ""}`}
            </Text>
          )}

          {phase === "ended" && (
            <>
              <Text
                position={[0, 0.2, 0]}
                fontSize={1}
                font="./fonts/nickname.otf"
                color={0x9f7aea}
              >
                Game Over!
              </Text>
              <Text
                position={[0, -0.3, 0]}
                fontSize={0.17}
                font="./fonts/nickname.otf"
                color={0x9f7aea}
              >
                (You have won {playerWinsTotal} games in total and computer has
                won {computerWinsTotal})
              </Text>
              <Image
                url="./icons/replay.png"
                position={[0, -0.8, 0]}
                scale={[0.6, 0.6, 0.6]}
                transparent
                opacity={0.75}
                onClick={() => handleRestart()}
                onPointerOver={handleHover}
                onPointerOut={handleUnhover}
              />
            </>
          )}
        </Float>
      </Canvas>
    </div>
  );
}
