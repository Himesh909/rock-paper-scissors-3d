import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader2, Trophy, Gamepad2, Clock } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function GameDataComponent() {
  const { walletAddress } = useParams();
  const [gameData, setGameData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGameData();
  }, []);

  const fetchGameData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/crud/game-data/${walletAddress}`
      );
      setGameData(response.data.game_data);
    } catch (error) {
      console.error("Error fetching game data:", error);
      setMessage("Failed to fetch game data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b1e] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#ff00ff] mx-auto" />
          <p className="mt-4 text-[#00ffff] text-lg">Loading game data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1e] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1a1b3b] bg-opacity-50 p-6 rounded-xl border border-[#ff00ff]/20 backdrop-blur-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-center">
              Game Statistics
            </h1>
            <p className="text-[#8a8aa3] text-center mt-2">
              Wallet: {walletAddress}
            </p>
          </div>

          {message && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400">{message}</p>
            </div>
          )}

          {gameData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ff00ff]/20">
                    <th className="px-4 py-3 text-left text-[#00ffff]">Mode</th>
                    <th className="px-4 py-3 text-left text-[#00ffff]">
                      Rounds
                    </th>
                    <th className="px-4 py-3 text-left text-[#00ffff]">
                      Winner
                    </th>
                    <th className="px-4 py-3 text-left text-[#00ffff]">
                      Player Score
                    </th>
                    <th className="px-4 py-3 text-left text-[#00ffff]">
                      Computer Score
                    </th>
                    <th className="px-4 py-3 text-left text-[#00ffff]">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gameData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#ff00ff]/10 hover:bg-[#ff00ff]/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-[#e0e0ff]">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-[#ff00ff]" />
                          {data.mode}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e0e0ff]">
                        {data.rounds}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-[#e0e0ff]">{data.winner}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#e0e0ff]">
                        {data.player_score}
                      </td>
                      <td className="px-4 py-3 text-[#e0e0ff]">
                        {data.computer_score}
                      </td>
                      <td className="px-4 py-3 text-[#8a8aa3]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {new Date(data.timestamp).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#1a1b3b]/30 rounded-lg border border-[#ff00ff]/10">
              <Gamepad2 className="w-16 h-16 mx-auto text-[#ff00ff]/40 mb-4" />
              <p className="text-[#8a8aa3]">
                No game data available for this user.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
