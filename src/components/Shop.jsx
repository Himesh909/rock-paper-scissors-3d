import React, { useState, useEffect } from "react";
import Web3 from "web3";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SKINS = [
  {
    id: 1,
    name: "Default",
    price: 5,
    image:
      "https://nxtby.com/media/catalog/product/cache/4689f0fab7cdae925f30cd865695b625/t/o/toilet-paper-roll-34-gsm-2-ply-white.jpg",
    description: "Standard issue, reliable and always ready for action.",
  },
  {
    id: 2,
    name: "Neon",
    price: 8,
    image: "https://igodhackerr.github.io/sample/BPR.PNG",
    description: "Bright and vibrant, this neon blue toilet paper stands out.",
  },
  {
    id: 3,
    name: "Golden",
    price: 6,
    image:
      "https://media.istockphoto.com/id/1289238479/photo/roll-of-gold-colored-toilet-paper.jpg?s=612x612&w=0&k=20&c=OH5HJ_z2uyMV5o2Bmh2JxMyt9mo0zJ3YfC3REEdMCZ0=",
    description:
      "Luxurious and elegant, this golden toilet paper adds a touch of class.",
  },
  {
    id: 4,
    name: "Crystal",
    price: 10,
    image:
      "https://cdn.discordapp.com/attachments/1153552286283464724/1339609198958346351/download_14.png?ex=67af57c9&is=67ae0649&hm=1c0defbc716055069e02abbea9912544d249d8b4fe43276ab875503d2a0ffc41&",
    description:
      "Shimmering and pristine, this crystal toilet paper offers a touch of magic.",
  },
];

export default function Shop() {
  const [status, setStatus] = useState("");
  const [ownedSkins, setOwnedSkins] = useState({});
  const [selectedSkin, setSelectedSkin] = useState(null);

  const RPC_URL = "https://rpc.testnet.immutable.com"; // Immutable zkEVM testnet RPC URL
  const TOKEN_CONTRACT_ADDRESS = "0xd9c159a9c2fdeed9a1750681cf1af13e16cdfa1d";
  const TOKEN_ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      type: "function",
    },
  ];

  const CHAIN_ID = 13473; // Immutable zkEVM testnet chain ID
  const FIXED_WALLET_ADDRESS = "0x6F3E3D58ED302345d680Fe512Df7c738Cc4B8A20";
  const FIXED_AMOUNT = 5;

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask is not installed.");
        return;
      }

      setStatus("Connecting to MetaMask...");
      const web3 = new Web3(window.ethereum);

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      const MINT_API_URL = `${BACKEND_URL}/BPR/mint_nft`; // Flask API endpoint

      // Ensure the user is connected to the correct chain
      let chainId = await web3.eth.getChainId();
      chainId = Number(chainId);
      if (chainId !== CHAIN_ID) {
        setStatus(`Please switch to the correct chain (ID: ${CHAIN_ID}).`);
        return;
      }

      const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);

      // Convert amount to smallest unit (using toWei)
      const value = web3.utils.toWei(FIXED_AMOUNT.toString(), "ether");

      setStatus("Preparing transaction...");
      const gasPrice = await web3.eth.getGasPrice();

      // Estimate gas
      const gasLimit = await contract.methods
        .transfer(FIXED_WALLET_ADDRESS, value)
        .estimateGas({ from: account });

      // Send transaction
      const tx = await contract.methods
        .transfer(FIXED_WALLET_ADDRESS, value)
        .send({
          from: account,
          gas: gasLimit,
          gasPrice,
        });

      setStatus(`Transfer successful! Transaction hash: ${tx.transactionHash}`);

      // Send a mint request to the Flask API
      setStatus("Minting NFT...");
      const mintResponse = await fetch(MINT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account }),
      });

      if (mintResponse.ok) {
        const mintResult = await mintResponse.json();
        setStatus(`NFT minted successfully! ${mintResult.message}`);
      } else {
        const errorResult = await mintResponse.json();
        setStatus(`Failed to mint NFT: ${errorResult.error}`);
      }
    } catch (error) {
      console.error(error);
      setStatus(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-cyan-400 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          CYBERVERSE ARSENAL
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKINS.map((skin) => (
            <div
              key={skin.id}
              className="bg-gray-800 rounded-lg p-6 border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20"
            >
              <div className="relative">
                <img
                  src={skin.image}
                  alt={skin.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                {ownedSkins[skin.id] && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    Owned
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{skin.name}</h3>
              <p className="text-gray-400 mb-4 text-sm">{skin.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{skin.price} COX</span>
                <button
                  onClick={() => handleTransfer(skin)}
                  disabled={ownedSkins[skin.id]}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                    ownedSkins[skin.id]
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                  }`}
                >
                  {ownedSkins[skin.id] ? "Owned" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {status && (
          <div className="fixed bottom-8 right-8 max-w-md bg-gray-800 border border-cyan-400/20 p-4 rounded-lg shadow-lg">
            <p className="text-sm">{status}</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => (window.location.href = "/inventory")}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            View Inventory
          </button>
        </div>
      </div>
    </div>
  );
}
