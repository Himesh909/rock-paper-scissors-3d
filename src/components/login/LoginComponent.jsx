import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  Loader2,
  ShieldCheck,
  Users,
  Sword,
  Coins,
  Package,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL
const VITE_BACKEND_URL_LOGIN = import.meta.env.VITE_BACKEND_URL_LOGIN; // Backend URL

export default function LoginComponent() {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("walletAddress") || null
  );
  const [userInfo, setUserInfo] = useState("");
  const [walletStatus, setWalletStatus] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [showOptions, setShowOptions] = useState(false); // Default false
  const [isConnected, setIsConnected] = useState(false); // Default false
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  // useEffect(() => {
  //   if (walletAddress && isConnected) {
  //     // setShowOptions(true); // Enable options only if user is logged in
  //   }
  // }, [walletAddress, isConnected]);

  useEffect(() => {
    async function checkConnection() {
      if (window.ethereum) {
        try {
          setLoading(true);
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            localStorage.setItem("walletAddress", address);
            await checkUserExists(address); // Check if user exists in backend
            setIsConnected(true);
            setLoading(false);
          } else {
            console.log("No wallet connected.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
          setErrorStatus("Failed to check wallet connection.");
          setLoading(false);
        }
      } else {
        console.warn("MetaMask not detected.");
        setLoading(false);
      }
    }
    if (!walletAddress) checkConnection();
  }, [walletAddress]);

  const checkUserExists = async (address) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/login/check-user/${address}`
      );
      const data = await response.json();
      if (response.ok && data.exists) {
        setUserExists(true);
        setUserInfo(`Welcome back, ${data.username}!`);
        setProfileImageURL(data.profile_image);
        setShowOptions(true); // Enable options for existing users
      } else {
        setUserExists(false);
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      setErrorStatus("Failed to check user existence. Please try again.");
    }
  };

  const connectMetamask = async () => {
    setErrorStatus("");
    setUserInfo("");
    setLoading(true);

    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
        await checkUserExists(address);
        setIsConnected(true);
        setIsMetaMaskConnected(true);
        setLoading(false);
      } catch (error) {
        console.error("MetaMask connection error:", error);
        setErrorStatus("Failed to connect to MetaMask. Please try again.");
        setLoading(false);
      }
    } else {
      console.error("MetaMask is not installed.");
      setErrorStatus(
        "MetaMask is not installed. Please install it and try again."
      );
      setLoading(false);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    } else {
      console.warn("No file selected for profile image.");
    }
  };

  const handleSubmit = async () => {
    if (!userName || !profileImage || !walletAddress) {
      setErrorStatus("Please fill all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("walletAddress", walletAddress);
    formData.append("username", userName);
    formData.append("profile_image", profileImage);

    try {
      const response = await fetch(`${VITE_BACKEND_URL_LOGIN}/login`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to log in.");
      }

      const data = await response.json();
      setUserInfo(`Welcome, ${data.username}!`);
      setWalletStatus(`Wallet: ${walletAddress}`);
      setProfileImageURL(data.profile_image);
      setShowOptions(true);
      setErrorStatus("");
      setUserExists(true);
    } catch (error) {
      setErrorStatus("Failed to save user data. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("walletAddress");
    setWalletAddress(null);
    setUserInfo("");
    setWalletStatus("");
    setErrorStatus("");
    setShowOptions(false);
    setIsConnected(false);
    setIsMetaMaskConnected(false);
    setUserName("");
    setProfileImage(null);
    setProfileImageURL("");
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 border-4 border-cyber-blue/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-cyber-pink border-t-transparent rounded-full animate-spin" />
      </motion.div>
      <p className="text-cyber-blue animate-pulse">Connecting to Wallet...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-cyber-dark bg-cyber-grid text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" max-w-md mx-auto"
        >
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-blue bg-clip-text text-transparent">
            Crypto Quest
          </h1>

          <div className="">
            {/* Login Section */}
            <div className="bg-cyber-darker/80 p-6 rounded-lg border border-cyber-blue/20 backdrop-blur-sm">
              <div className="space-y-6">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {!isMetaMaskConnected && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-cyber-pink to-cyber-blue py-3 px-6 rounded-lg font-bold text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 animate-glow"
                        onClick={connectMetamask}
                      >
                        <Wallet className="w-5 h-5" />
                        Connect with MetaMask
                      </motion.button>
                    )}

                    {userInfo && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-cyber-blue"
                      >
                        {userInfo}
                      </motion.div>
                    )}

                    {errorStatus && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-center"
                      >
                        {errorStatus}
                      </motion.div>
                    )}

                    {!userExists && isConnected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-cyber-blue text-sm font-medium mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-2 focus:outline-none focus:border-cyber-blue text-white"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-cyber-blue text-sm font-medium mb-2">
                            Profile Image
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg px-4 py-2 focus:outline-none focus:border-cyber-blue text-white file:bg-cyber-blue/20 file:border-0 file:text-cyber-blue file:px-4 file:py-2 file:rounded-lg file:mr-4 file:cursor-pointer"
                            onChange={handleProfileImageChange}
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-all duration-200"
                          onClick={handleSubmit}
                        >
                          Create Profile
                        </motion.button>
                      </motion.div>
                    )}

                    {showOptions && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-cyber-pink to-cyber-purple py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                          onClick={() => (window.location.href = "/rps")}
                        >
                          <Sword className="w-5 h-5" />
                          Rock Paper Scissors
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-blue py-2 px-4 rounded-lg font-bold hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                          onClick={() =>
                            (window.location.href = "/leaderboard")
                          }
                        >
                          <ShieldCheck className="w-5 h-5" />
                          Leader Board
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-red-500/80 py-2 px-4 rounded-lg font-bold hover:bg-red-600/80 transition-all duration-200"
                          onClick={logout}
                        >
                          Logout
                        </motion.button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Features Section
            <div className="space-y-4">
              {[
                {
                  icon: Coins,
                  title: "Play to Earn",
                  description:
                    "Earn real crypto rewards through gameplay and trading.",
                },
                {
                  icon: Sword,
                  title: "Epic Battles",
                  description:
                    "Engage in intense PvP combat with unique abilities.",
                },
                {
                  icon: Package,
                  title: "NFT Marketplace",
                  description: "Trade unique in-game items and characters.",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description:
                    "Shape the future of the game through DAO governance.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-cyber-darker/80 p-4 rounded-lg border border-cyber-blue/20 backdrop-blur-sm hover:border-cyber-blue/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-cyber-pink to-cyber-blue p-2 rounded-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-cyber-blue">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
