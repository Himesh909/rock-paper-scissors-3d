import React, { useState } from "react";
import Web3 from "web3";
import { ABI } from "./ERC721-ABI";
import { Flame, AlertCircle } from "lucide-react";

const BurnNFTComponent = () => {
  const [status, setStatus] = useState("");
  const [tokenIds, setTokenIds] = useState("");

  const RPC_URL = "https://rpc.testnet.immutable.com";
  const CONTRACT_ADDRESS = "0x29f51c15546a1cf2d5145d75a11e1920c5c9d21a";
  const CHAIN_ID = 13473;

  const abi = ABI;

  const handleBurn = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask is not installed.");
        return;
      }

      setStatus("Connecting to MetaMask...");
      const web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      let chainId = await web3.eth.getChainId();
      chainId = Number(chainId);
      if (chainId !== CHAIN_ID) {
        setStatus(`Please switch to the correct chain (ID: ${CHAIN_ID}).`);
        return;
      }

      const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      const tokenIdArray = tokenIds.split(",").map((id) => id.trim());

      setStatus("Preparing transaction...");
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods
        .burnBatch(tokenIdArray)
        .estimateGas({ from: account });

      const tx = await contract.methods.burnBatch(tokenIdArray).send({
        from: account,
        gas: gasLimit,
        gasPrice,
      });

      setStatus(
        `Burn transaction successful! Transaction hash: ${tx.transactionHash}`
      );
    } catch (error) {
      console.error(error);
      setStatus(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0c1620] to-black text-white p-4">
      <div className=" max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CYBERVERSE
          </h1>
          <p className="text-cyan-400 mt-2">NFT Burn Portal</p>
        </div>

        {/* Main Card */}
        <div className="relative backdrop-blur-xl bg-black/30 rounded-xl border border-cyan-500/20 p-6 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
          <div className="absolute -top-3 -right-3">
            <Flame className="w-8 h-8 text-red-500 animate-pulse" />
          </div>

          <div className="space-y-6">
            {/* Token Input */}
            <div>
              <label className="block text-cyan-400 text-sm mb-2">
                TOKEN IDs
              </label>
              <input
                type="text"
                placeholder="Enter token IDs (comma-separated)"
                value={tokenIds}
                onChange={(e) => setTokenIds(e.target.value)}
                className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Burn Button */}
            <button
              onClick={handleBurn}
              className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5" />
              BURN NFTs
            </button>

            {/* Status Message */}
            {status && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">{status}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm ">
          <p>Connected to Immutable X Testnet</p>
          <p className="mt-1 text-xs">{CONTRACT_ADDRESS}</p>
        </div>
      </div>
    </div>
  );
};

export default BurnNFTComponent;
