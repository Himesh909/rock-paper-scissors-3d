// import React, { useEffect, useState } from "react";

// export default function Leaderboard() {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch leaderboard data from the API
//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/lead/leaderboard"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch leaderboard data");
//         }
//         const data = await response.json();
//         setLeaderboard(data.leaderboard);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center text-lg font-medium py-8">
//         Loading leaderboard...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 text-lg py-8">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>
//       <div className="overflow-x-auto bg-gray-100 bg-opacity-25 p-4 rounded-lg ">
//         <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Rank
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 User Name
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Wallet Address
//               </th>
//               <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//                 Wins
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboard.map((entry, index) => (
//               <tr
//                 key={index}
//                 className={
//                   index % 2 === 0
//                     ? "bg-white hover:bg-gray-50"
//                     : "bg-gray-50 hover:bg-gray-100"
//                 }
//               >
//                 <td className="py-3 px-4 text-sm text-gray-700 font-medium">
//                   {index + 1}
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-700">
//                   {entry.userName}
//                 </td>
//                 <td
//                   className="py-3 px-4 text-sm text-gray-700 truncate"
//                   title={entry.walletAddress}
//                 >
//                   {entry.walletAddress}
//                 </td>
//                 <td className="py-3 px-4 text-sm text-gray-700">
//                   {entry.wins}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import { Trophy, Medal, Gem, TrendingUp } from 'lucide-react';

// const players = [
//   { id: 1, name: "CryptoNinja", score: 284.7, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
//   { id: 2, name: "BlockchainQueen", score: 251.9, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
//   { id: 3, name: "MetaVerse_Master", score: 234.1, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150" },
//   { id: 4, name: "DeFi_Warrior", score: 198.2, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
//   { id: 5, name: "TokenWhale", score: 185.4, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
//   { id: 6, name: "Web3_Pioneer", score: 172.3, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150" },
//   { id: 7, name: "HashMaster", score: 164.5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
//   { id: 8, name: "CryptoVault", score: 153.2, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" },
//   { id: 9, name: "ChainBreaker", score: 149.8, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
//   { id: 10, name: "ByteRunner", score: 138.7, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
// ];

// const RankIcon = ({ rank }) => {
//   if (rank === 1) return <Trophy className="w-6 h-6 text-[#FFD700]" />;
//   if (rank === 2) return <Medal className="w-6 h-6 text-[#C0C0C0]" />;
//   if (rank === 3) return <Medal className="w-6 h-6 text-[#CD7F32]" />;
//   return <Gem className="w-6 h-6 text-gray-500 opacity-50" />;
// };

// function App() {
//   return (
//     <div className="min-h-screen bg-[#0a0a0b] p-4 sm:p-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d75] to-[#40e0d0] neon-glow">
//             CRYPTO ELITE
//           </h1>
//           <div className="flex items-center justify-center gap-2 text-gray-400">
//             <TrendingUp className="w-4 h-4" />
//             <span className="text-sm">Top Performers</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {players.map((player, index) => {
//             const rank = index + 1;
//             const getBgClass = (rank) => {
//               if (rank === 1) return 'bg-[#151515] border-[#ffd700]/20';
//               if (rank === 2) return 'bg-[#131313] border-[#c0c0c0]/20';
//               if (rank === 3) return 'bg-[#111111] border-[#cd7f32]/20';
//               return 'bg-[#0f0f0f] border-gray-800/50';
//             };

//             return (
//               <div
//                 key={player.id}
//                 className={`${getBgClass(rank)} border rounded-lg p-4 transition-all duration-300 transform hover:scale-[1.02] hover:bg-opacity-90`}
//               >
//                 <div className="flex items-center justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <div className="flex-shrink-0 w-8">
//                       <RankIcon rank={rank} />
//                     </div>

//                     <div className="flex-shrink-0">
//                       <div className="relative">
//                         <img
//                           src={player.avatar}
//                           alt={player.name}
//                           className="w-10 h-10 rounded-full object-cover border border-gray-800"
//                         />
//                         {rank <= 3 && (
//                           <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#ff2d75]/10 to-[#40e0d0]/10 animate-pulse" />
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex-grow">
//                       <h3 className="font-bold text-gray-100">
//                         {player.name}
//                       </h3>
//                     </div>
//                   </div>

//                   <div className="flex-shrink-0">
//                     <span className="font-mono font-bold text-[#40e0d0]">
//                       {player.score.toLocaleString()} ETH
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { Trophy, Medal, Gem, TrendingUp } from "lucide-react";

// RankIcon component for rendering rank badges
const RankIcon = ({ rank }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-[#FFD700]" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-[#C0C0C0]" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-[#CD7F32]" />;
  return <Gem className="w-6 h-6 text-gray-500 opacity-50" />;
};

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data from the API
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // const response = await fetch("http://localhost:5000/lead/leaderboard");
        const response = await fetch(
          "https://api.cryptoquest.studio/lead/leaderboard"
        );
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

  if (loading) {
    return (
      <div className="text-center text-lg font-medium py-8">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg py-8">
        Error: {error}
      </div>
    );
  }

  const getBgClass = (rank) => {
    if (rank === 1) return "bg-[#151515] border-[#ffd700]/20";
    if (rank === 2) return "bg-[#131313] border-[#c0c0c0]/20";
    if (rank === 3) return "bg-[#111111] border-[#cd7f32]/20";
    return "bg-[#0f0f0f] border-gray-800/50";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d75] to-[#40e0d0] neon-glow">
            CRYPTO ELITE
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Top Performers</span>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            return (
              <div
                key={entry.id}
                className={`${getBgClass(
                  rank
                )} border rounded-lg p-4 transition-all duration-300 transform hover:scale-[1.02] hover:bg-opacity-90`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8">
                      <RankIcon rank={rank} />
                    </div>

                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={
                            entry.avatar || "https://via.placeholder.com/150"
                          }
                          alt={entry.userName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-800"
                        />
                        {rank <= 3 && (
                          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#ff2d75]/10 to-[#40e0d0]/10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-100">
                        {entry.userName}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <span className="font-mono font-bold text-[#40e0d0]">
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
