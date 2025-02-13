import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Edit3,
  Trash2,
  GamepadIcon,
  Shield,
  Loader2,
} from "lucide-react";
import "./AdminComponent.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminComponent() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/crud/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = async (walletAddress) => {
    const newUsername = prompt("Enter new username:");
    if (!newUsername) return;

    try {
      const response = await axios.put(
        `${BACKEND_URL}/crud/users/${walletAddress}`,
        {
          username: newUsername,
        }
      );
      setMessage(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error editing user:", error);
      setMessage("Failed to edit user.");
    }
  };

  const handleDeleteUser = async (walletAddress) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/crud/users/${walletAddress}`
      );
      setMessage(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Failed to delete user.");
    }
  };

  const handleViewGameData = (walletAddress) => {
    navigate(`/game-data/${walletAddress}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
            CYBERVERSE Admin
          </h1>
          <p className="text-cyan-400">User Management Dashboard</p>
        </div>

        {message && (
          <div className="bg-purple-900 border border-purple-500 text-purple-100 px-4 py-3 rounded mb-6">
            {message}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
            <p className="text-lg text-cyan-400 animate-pulse">
              Loading Users...
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {users.map((user) => (
              <div
                key={user.wallet_address}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Shield className="w-10 h-10 text-purple-400" />
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400">
                        {user.username}
                      </h3>
                      <p className="text-sm text-gray-400 font-mono">
                        {user.wallet_address}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditUser(user.wallet_address)}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.wallet_address)}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => handleViewGameData(user.wallet_address)}
                      className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      <GamepadIcon className="w-4 h-4" />
                      <span>Game Data</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
