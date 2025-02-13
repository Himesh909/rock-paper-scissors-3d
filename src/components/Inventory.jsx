import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cuboid as Cube, Wallet, RefreshCw } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Inventory() {
  const [walletAddress, setWalletAddress] = useState("");
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const fetchAssets = async () => {
    if (!walletAddress) {
      setError("Wallet address is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/invt/fetch-assets`, {
        walletAddress: walletAddress,
      });

      if (response.data.assets) {
        setAssets(response.data.assets);
      } else {
        setError("No assets found");
      }
    } catch (error) {
      setError("An error occurred while fetching assets");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0f1729] to-black text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Cube className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Digital Vault
            </h1>
          </div>
          <button
            onClick={fetchAssets}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-cyan-500/20"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Sync Assets</span>
          </button>
        </div>

        {/* Status Messages */}
        {loading && (
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-cyan-500"></div>
            <p className="text-cyan-400">Synchronizing blockchain data...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.length > 0 ? (
            assets.map((asset, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {asset.name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {asset.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-cyan-400">TokenID:</span>
                      <span className="text-gray-300 font-mono">
                        {asset.token_id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-purple-400">Contract:</span>
                      <span className="text-gray-300 font-mono truncate">
                        {asset.contract_address}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700/50">
                  <span className="text-xs text-cyan-400 font-semibold">
                    NFT
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 py-20">
              <Wallet className="w-16 h-16 text-gray-600" />
              <p className="text-gray-400 text-lg">
                No digital assets found in this Wallet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inventory;
