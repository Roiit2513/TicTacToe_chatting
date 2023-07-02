import React, { useEffect, useState } from "react";

import "../CSS/game.css";
import Square from "./square";
import Patterns from "./patterns";

function Game({ socket, username, roomId , room}) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [currTurn, setCurrTurn] = useState(room.User1);
    const [result, setResult] = useState({ winner: "none", state: "none" });
    const [change, setChange] = useState(true);

    useEffect(() => {
        checkWinner();
        console.log(room);
    }, [board]);

    useEffect(() => {
        socket.emit("send_gameData", {roomId: roomId, board: board, currTurn: currTurn});
    }, [change]);

    useEffect(() => {
        if (result.state !== "none") {
            setTimeout(function () {
                setBoard(["", "", "", "", "", "", "", "", ""]);
                setResult({ winner: "none", state: "none" });
            }, 5000)
        }
    }, [result])

    useEffect(() => {
        socket.on("receive_gameData", (data) => {
            setBoard(data.board);
            setCurrTurn(data.currTurn);
        });
    }, [socket]);

    function chooseSquare(index) {
        if (result.state === "none" && (username === currTurn)) {
            setBoard(
                board.map((val, i) => {
                    if (i === index && val === "") {
                        if(currTurn === room.User1){
                            return "X";
                        } else{
                            return "O";
                        }
                    }
                    return val;
                })
            );
            if(currTurn === room.User1){
                setCurrTurn(room.User2);
            } else{
                setCurrTurn(room.User1);
            }
            setChange(!change);
        }
        console.log(board);
        
    }
    function checkWinner() {
        let checktie = false;
        Patterns.forEach((set) => {
            const curr = board[set[0]];
            if (curr === "") {
                return;
            }
            let flag = true;
            set.forEach((index) => {
                if (board[index] !== curr) {
                    flag = false;
                }
            });
            if (flag) {
                setResult({ winner: username, state: "won" })
            } else {
                checktie = true;
            }
        })
        if (checktie) {
            let flag = true;
            board.forEach((val) => {
                if (val === "") {
                    flag = false;
                }
            })
            if (flag) {
                setResult({ winner: "No one", state: "Tie" });
            }
        }
    }

    return (
        <div className="game-page">
            <h1><u>TIC - TAC - TOE</u></h1>
            <h2>Welcome {username}</h2>
            <h1>{(result.state !== "none") ? "Game finished , winner : " + result.winner : "Chance : " + currTurn}</h1>
            <div className="board">
                <div className="row">
                    <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
                    <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
                    <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
                </div>
                <div className="row">
                    <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
                    <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
                    <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
                </div>
                <div className="row">
                    <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
                    <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
                    <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
                </div>
            </div>
        </div>
    );
}

export default Game;