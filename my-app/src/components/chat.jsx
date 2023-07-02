import React, { useEffect } from "react";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import ScrollableFeed from 'react-scrollable-feed'

import "../CSS/home.css";

function Chat({ socket, username, roomId }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                roomId: roomId,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + " : " + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    useEffect(() => {
        setCurrentMessage("");
    }, [messageList]);
    return (
        <div className="chat-box">
            <div className="chat-title">
                <h3>{roomId ? `Room id : ${roomId}` : "Live Chat"}</h3>
            </div>
            <div id="all-msg" className="chat-all-msg">
            <ScrollableFeed>
                {messageList.map((data) => {
                    return (
                        <div className={(data.author === username) ? " box self" : "box"}>
                            <div key={data} className="msg-box">
                                <p className="msg-author">{(data.author !== username) ? "-- " + data.author : null}</p>
                                <p className="msg-content">{data.message}</p>
                                <p className="msg-time">{data.time}</p>
                            </div>
                        </div>
                    )
                })}
            </ScrollableFeed>
            </div>
            <div className="chat-new-msg">
                <input type="text" placeholder="Message" onChange={(event) => { setCurrentMessage(event.target.value) }} value={currentMessage} />
                <button onClick={sendMessage} style={currentMessage ? { "backgroundColor": "green" } : null}><BiSend /></button>
            </div>
        </div>
    );
}

export default Chat;