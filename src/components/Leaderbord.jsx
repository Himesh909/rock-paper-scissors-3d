import React, { useEffect, useState } from "react";
import { Trophy, Medal, Gem, TrendingUp, Loader2 } from "lucide-react";

const RankIcon = ({ rank, className = "" }) => {
  if (rank === 1)
    return (
      <Trophy
        className={`${className} text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]`}
      />
    );
  if (rank === 2)
    return (
      <Medal
        className={`${className} text-[#C0C0C0] drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]`}
      />
    );
  if (rank === 3)
    return (
      <Medal
        className={`${className} text-[#CD7F32] drop-shadow-[0_0_10px_rgba(205,127,50,0.5)]`}
      />
    );
  return <Gem className={`${className} text-gray-500 opacity-50`} />;
};

const LoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-20 bg-gray-800/50 rounded-xl"></div>
    ))}
  </div>
);

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/lead/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getCardStyle = (rank) => {
    const baseStyle =
      "card-shine relative overflow-hidden border transition-all duration-500 hover:transform hover:scale-[1.02] hover:z-10";
    const styles = {
      1: `${baseStyle} bg-gradient-to-br from-[#1a1a1a] to-[#000] border-[#ffd700]/30 p-6 rounded-2xl transform hover:-translate-y-2`,
      2: `${baseStyle} bg-gradient-to-br from-[#181818] to-[#000] border-[#c0c0c0]/30 p-5 rounded-xl transform hover:-translate-y-1`,
      3: `${baseStyle} bg-gradient-to-br from-[#161616] to-[#000] border-[#cd7f32]/30 p-4 rounded-lg`,
      default: `${baseStyle} bg-gradient-to-br from-[#141414] to-[#000] border-gray-800/30 p-3 rounded-lg`,
    };
    return styles[rank] || styles.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] to-[#000] p-4 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d75] to-[#40e0d0] neon-glow">
              CRYPTO ELITE
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-[#40e0d0]" />
              <span className="text-gray-400">Loading rankings...</span>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] to-[#000] p-4 sm:p-8 flex items-center justify-center">
        <div className="glass-effect p-8 rounded-2xl border border-red-500/20 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Leaderboard
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] to-[#000] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d75] to-[#40e0d0] neon-glow">
            CRYPTO ELITE
          </h1>
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-white/5">
            <TrendingUp className="w-4 h-4 mr-2 text-[#40e0d0]" />
            <span className="text-sm text-gray-300">Top Performers</span>
          </div>
        </div>

        <div className="space-y-4 custom-scrollbar">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            return (
              <div
                key={index}
                className={getCardStyle(rank)}
                style={{
                  animation:
                    rank <= 3 ? "float 6s ease-in-out infinite" : "none",
                  animationDelay: `${rank * 0.2}s`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <RankIcon
                        rank={rank}
                        className={`w-${
                          rank === 1
                            ? "8"
                            : rank === 2
                            ? "7"
                            : rank === 3
                            ? "6"
                            : "5"
                        } h-${
                          rank === 1
                            ? "8"
                            : rank === 2
                            ? "7"
                            : rank === 3
                            ? "6"
                            : "5"
                        }`}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-100 truncate max-w-[150px] sm:max-w-[200px]">
                        {entry.walletAddress}
                      </h3>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`font-mono font-bold ${
                        rank <= 3
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#40e0d0] to-[#ff2d75]"
                          : "text-[#40e0d0]"
                      }`}
                    >
                      {entry.wins.toLocaleString()} Wins
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
