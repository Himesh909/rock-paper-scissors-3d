import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin, Game, GameData, Login } from "./pages";
import notFoundImage from "../public/assets/404.png";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rps" element={<Game />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/game-data/:walletAddress" element={<GameData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 bg-opacity-25">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="w-400 h-400 text-gray-400"
      />
    </div>
  );
};

export default App;
