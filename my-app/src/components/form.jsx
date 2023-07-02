import React, { useEffect } from "react";
import { useState } from "react";

import "../CSS/home.css";
import Chat from "./chat";
import Game from "./game";
import Wait from "./wait";

function JoinRoom({ socket }) {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [wait, setWait] = useState(false);
    const [room, setRoom] = useState({});
    const [join, setJoin] = useState(false);

    useEffect(() => {
        socket.on("room_created", (newRoomId) => {
            setRoomId(newRoomId);
            setWait(true);
        })
    }, [socket])
    useEffect(() => {
        socket.on("room_joined", (ServerRoom) => {
            setLoggedIn(true);
            setRoom(ServerRoom);
        })
    }, [socket])
    useEffect(() => {
        if (username !== "" && roomId !== ""){
            const data = {username : username, roomId: roomId};
            socket.emit("handle_join" , data);
        }
    }, [join])

    const joinRoom = () => {
        if (username !== "" && roomId !== "") {
            const data = {username : username, roomId: roomId};
            socket.emit("join_room", data);
            setJoin(true);
        }
    }
    const CreateRoom = () => {
        if (username !== "") {
            socket.emit("create_room", username);
        } else {
            alert("Enter your UserName");
        }
    }

    return (
        <>
            {(loggedIn) ?
                <div className="logged-in">
                    <Game socket={socket} roomId={roomId} username={username} room={room}/>
                    <Chat socket={socket} roomId={roomId} username={username} />
                </div>
                :
                (wait) ?
                    <Wait  socket={socket} roomId={roomId} username={username} />
                    :
                    <div className="joinRoom">
                        <h2><u>Tic-Tac-Toe while Chatting</u></h2>
                        <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
                        <div className="create-join">
                            <div className="create">
                                <button onClick={CreateRoom}>Create Room</button>
                            </div>
                            <div className="join">
                                <input type="text" placeholder="Room Id" onChange={(event) => setRoomId(event.target.value)} />
                                <button onClick={joinRoom}>Join Room</button>
                            </div>
                        </div>
                    </div>
            }

 

        </>
    );
}

export default JoinRoom;