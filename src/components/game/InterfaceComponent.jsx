import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import GameComponent from "./GameComponent";

function InterfaceComponent() {
  const [mode, setMode] = useState("threeWins");
  const [round, setRound] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [modeName, setModeName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  useEffect(() => {
    switch (mode) {
      case "threeWins":
        setModeName("Three Wins");
        break;
      case "fiveWins":
        setModeName("Five Wins");
        break;
      case "sevenWins":
        setModeName("Seven Wins");
        break;
      case "endless":
        setModeName("Endless");
        break;
    }
  }, [mode]);

  const clearData = () => {
    window.localStorage.clear();
  };

  const handleRestart = () => {
    setRound(1);
    setPlayerScore(0);
    setComputerScore(0);
  };

  const modes = [
    { id: "0", text: "Three Wins", name: "threeWins" },
    { id: "1", text: "Five Wins", name: "fiveWins" },
    { id: "2", text: "Seven Wins", name: "sevenWins" },
    { id: "3", text: "Endless", name: "endless" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-purple-500/10 animate-gradient-x" />
          <div className="relative bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg">
            <div className="px-6 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Rock Paper Scissors
              </h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-500/10 border border-purple-500/30 p-2 rounded-lg hover:bg-purple-800/40 transition-all duration-300 hover:scale-105"
              >
                <Menu className="w-5 h-5 text-purple-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full flex justify-center items-center">
        {/* Gradient Effects */}
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-[radial-gradient(circle_at_top,rgba(67,4,96,0.5)_0%,rgba(10,10,15,0)_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vh] h-[100vh] rounded-t-full bg-[radial-gradient(circle_at_center,rgba(4,74,96,0.3)_0%,rgba(10,10,15,0)_70%)] blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vh] h-[75vh] rounded-t-full bg-[radial-gradient(circle_at_center,rgba(4,96,87,0.2)_0%,rgba(10,10,15,0)_70%)] blur-lg pointer-events-none" />

        {/* Game Component */}
        {/* <div className="relative z-10 container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex flex-col"> */}
        <div className="container t h-[90vh] flex flex-col">
          <GameComponent />
        </div>
      </div>

      {/* Floating Score display */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-purple-500/10 animate-gradient-x" />
          <div className="relative bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg">
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="space-y-1">
                  <div className="text-purple-400 text-sm font-medium">
                    Round
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {round}
                  </div>
                  <div className="text-xs text-purple-300">{modeName}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-purple-400 text-sm font-medium">You</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {playerScore}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-purple-400 text-sm font-medium">
                    Computer
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {computerScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#0a0a0f] border border-purple-500/30 rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Menu</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-purple-300 text-sm mb-3">Mode</h3>
                <div className="grid grid-cols-2 gap-3">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      className={`p-3 rounded-lg text-sm transition-colors ${
                        selectedMode?.name === mode.name
                          ? "bg-purple-600 text-white"
                          : "bg-purple-900/30 text-purple-300 hover:bg-purple-800/50"
                      }`}
                      onClick={() => {
                        setMode(mode.name);
                        setSelectedMode(mode);
                        window.localStorage.setItem("mode", mode.name);
                        handleRestart();
                      }}
                    >
                      {mode.text}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-purple-300 text-sm mb-3">Data</h3>
                <button
                  className="w-full p-3 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-800/50 transition-colors"
                  onClick={() => {
                    clearData();
                    handleRestart();
                  }}
                >
                  Clear Data
                </button>
              </div>
              <button
                onClick={() => (window.location.href = "/shop")}
                className="w-full p-3 bg-green-900/30 text-green-400 rounded-lg hover:bg-green-800/50 transition-colors"
              >
                Go to Shop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterfaceComponent;
