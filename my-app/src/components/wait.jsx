import React from "react";

function Wait({socket, roomId, username}){
    return(
        <>
        <h1>Waiting for other player to Join</h1>
        <h2>Welcome {username}</h2>
        <h2>Room Id : {roomId}</h2>
        </>
    )
}

export default Wait;