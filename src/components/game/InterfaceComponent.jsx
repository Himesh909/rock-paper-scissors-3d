import { useEffect, useState } from "react";
import { Menu, Brush } from "lucide-react";
import GameComponent from "./GameComponent";
import axios from "axios";
import useGame from "../../stores/useGame.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function InterfaceComponent() {
  const {
    mode,
    setMode,
    round,
    resetRound,
    restart,
    playerScore,
    setPlayerScore,
    computerScore,
    setComputerScore,
  } = useGame();
  const [modeName, setModeName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkinModalOpen, setIsSkinModalOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedSkin, setSelectedSkin] = useState("default");
  const [skins, setSkins] = useState([
    // Use state for skins
    {
      id: "default",
      name: "Default",
      preview:
        "https://nxtby.com/media/catalog/product/cache/4689f0fab7cdae925f30cd865695b625/t/o/toilet-paper-roll-34-gsm-2-ply-white.jpg",
      locked: false,
    },
    {
      id: "neon",
      name: "Neon",
      preview: "https://igodhackerr.github.io/sample/BPR.PNG",
      locked: true,
    },
    {
      id: "golden",
      name: "Golden",
      preview:
        "https://media.istockphoto.com/id/1289238479/photo/roll-of-gold-colored-toilet-paper.jpg?s=612x612&w=0&k=20&c=OH5HJ_z2uyMV5o2Bmh2JxMyt9mo0zJ3YfC3REEdMCZ0=",
      locked: true,
    },
    {
      id: "crystal",
      name: "Crystal",
      preview:
        "https://cdn.discordapp.com/attachments/1153552286283464724/1339609198958346351/download_14.png?ex=67af57c9&is=67ae0649&hm=1c0defbc716055069e02abbea9912544d249d8b4fe43276ab875503d2a0ffc41&",
      locked: true,
    },
  ]);

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
      default:
        setModeName("Unknown Mode"); // Handle default case
        break;
    }
  }, [mode]);

  const fetchAssets = async () => {
    const walletAddress = localStorage.getItem("walletAddress");
    if (!walletAddress) {
      console.log("Wallet address is required");
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/invt/fetch-assets`, {
        walletAddress: walletAddress,
      });

      if (response.data.assets) {
        const updatedSkins = skins.map((skin, index) => {
          if (index === 0) return skin; // Default skin is ALWAYS unlocked.

          let unlocked = skin.locked; // Default to the current locked state

          switch (skin.id) {
            case "neon":
              unlocked = response.data.assets.some(
                (asset) =>
                  asset.contract_address ===
                  "0x39cfe8cca230d77ab8ad54bdc0bda05e3a67036a"
              );
              break;
            case "golden":
              unlocked = response.data.assets.some(
                (asset) =>
                  asset.contract_address === "YOUR_GOLDEN_CONTRACT_ADDRESS" // Replace
              );
              break;
            case "crystal":
              unlocked = response.data.assets.some(
                (asset) =>
                  asset.contract_address === "YOUR_CRYSTAL_CONTRACT_ADDRESS" // Replace
              );
              break;
            default:
              break;
          }
          return { ...skin, locked: !unlocked }; // Unlock if condition is met
        });
        setSkins(updatedSkins);
      } else {
        console.log("No assets found");
      }
    } catch (error) {
      console.log("An error occurred while fetching assets");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const clearData = () => {
    handleRestart();
    window.localStorage.setItem("mode", mode);
    window.localStorage.setItem("round", 1);
    window.localStorage.setItem("playerScore", 0);
    window.localStorage.setItem("computerScore", 0);
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
    <div className="h-screen flex flex-col bg-[#0a0a0f] text-white relative overflow-hidden ">
      {/* Gradient Effects */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-[radial-gradient(circle_at_top,rgba(67,4,96,0.5)_0%,rgba(10,10,15,0)_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vh] h-[100vh] rounded-t-full bg-[radial-gradient(circle_at_center,rgba(4,74,96,0.3)_0%,rgba(10,10,15,0)_70%)] blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vh] h-[75vh] rounded-t-full bg-[radial-gradient(circle_at_center,rgba(4,96,87,0.2)_0%,rgba(10,10,15,0)_70%)] blur-lg pointer-events-none" />

      {/* Navbar Section - 2/11 of screen height */}
      <div className="h-[calc(2/11*100vh)] flex items-center px-4 mt-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/5 to-purple-500/10 animate-gradient-x" />
            <div className="relative bg-black/80 backdrop-blur-md border border-purple-500/30 shadow-lg">
              <div className="px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Rock Paper Scissors
                </h1>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsSkinModalOpen(true)}
                    className="bg-purple-500/10 border border-purple-500/30 p-2 rounded-lg hover:bg-purple-800/40 transition-all duration-300 hover:scale-105"
                  >
                    <Brush className="w-5 h-5 text-purple-400" />
                  </button>
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
        </div>
      </div>

      {/* Game Canvas Section - 6/11 of screen height */}
      {/* <div className="h-[calc(6/11*100vh)]"> */}
      <div className="h-screen">
        <GameComponent selectedSkin={selectedSkin} />
      </div>

      {/* Scoreboard Section */}
      <div className="h-[calc(3/11*100vh)] flex items-center px-4 mb-4">
        <div className="w-full max-w-2xl mx-auto">
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
                    <div className="text-purple-400 text-sm font-medium">
                      You
                    </div>
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
      </div>

      {/* Menu Modal */}
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

      {/* Skins Modal */}
      {isSkinModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsSkinModalOpen(false)} // Close on backdrop click
        >
          <div
            className="bg-[#0a0a0f] border border-purple-500/30 rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-400">Skins</h2>
              <span className="text-sm text-purple-300">
                Selected: {skins.find((skin) => skin.id === selectedSkin)?.name}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {skins.map((skin) => (
                <button
                  key={skin.id}
                  className={`relative group p-4 rounded-lg border transition-all duration-300 ${
                    selectedSkin === skin.id
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/15"
                  }`}
                  onClick={() => {
                    if (!skin.locked) {
                      setSelectedSkin(skin.id);
                      window.localStorage.setItem("selectedSkin", skin.id);
                    }
                  }}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-black/50">
                    {/* Preview image would go here in a real implementation */}
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-purple-400 text-4xl">
                        <img src={skin.preview} />
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-purple-300 font-medium">{skin.name}</h3>
                    {skin.locked ? (
                      <span className="text-xs text-red-400">Locked</span>
                    ) : (
                      <span className="text-xs text-green-400">Available</span>
                    )}
                  </div>
                  {skin.locked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                      <span className="text-red-400">🔒</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterfaceComponent;
