import React from "react";
import io from "socket.io-client";

import JoinRoom from "./form";
import "../CSS/home.css";

const socket = io.connect("https://tictactoe-mskw.onrender.com");

function Home() {
  return (
    <div className="home">
      <JoinRoom socket={socket}/>
    </div>
  );
}

export default Home;