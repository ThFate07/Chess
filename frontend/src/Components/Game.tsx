// chessboard, timeclock,chatbox, text like pieces

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { reverseBoard } from "../functions/utils";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export  function Game() {
  const socket = useSocket();
  const [chess, SetChess] = useState(new Chess());
  const [board, SetBoard] = useState(chess.board());
  const [message, setMessage] = useState("In queue...");
  const [color, SetColor] = useState("");

  
  useEffect(() => {
    // initialize game
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          // initialize board with either black peice or white
          const newChess = new Chess();

          SetChess(newChess);
          if (message.payload.color === "black") {
            SetBoard(reverseBoard(chess.board()));
          } else {
            SetBoard(newChess.board());
          }
          SetColor(message.payload.color);
          setMessage(`Game Started, You play as ${message.payload.color}`);


          // if color white allow to move
          break;

        case MOVE:
          if (message) setMessage("");
          // if move then register with the chess.js
          const move = message.payload;
          console.log("recieved move: ", move)
          chess.move(move);
          console.log("color: ", color, color === "black");

          SetBoard(color === "black" ? reverseBoard(chess.board()) :  chess.board());
          // and change the displayed board
          break;
        case GAME_OVER:
          // Todo: display you won you lost using message

          // display who won
          console.log("game over");
          break;

        default:
          break;
      }
    };

    if (!color) { 
      console.log("sent req")
      socket?.send(
        JSON.stringify({
          type: INIT_GAME,
        })
      );
    }

  }, [socket, color]);

  return (
    <>
      <div>
        <div className="text-white font-mono text-2xl m-5">{message}</div>
        <div>
          <ChessBoard
            board={board}
            chess={chess}
            socket={socket}
            setBoard={SetBoard}
            color={color}
          />
        </div>
        <div></div>
      </div>
    </>
  );
}

// [[{square: 'a8', type: 'r', color: 'b'},
//         {square: 'b8', type: 'n', color: 'b'},
//         {square: 'c8', type: 'b', color: 'b'},
//         {square: 'd8', type: 'q', color: 'b'},
//         {square: 'e8', type: 'k', color: 'b'},
//         {square: 'f8', type: 'b', color: 'b'},
//         {square: 'g8', type: 'n', color: 'b'},
//         {square: 'h8', type: 'r', color: 'b'}],
//         [...],
//         [...],
//         [...],
//         [...],
//         [...],
//         [{square: 'a1', type: 'r', color: 'w'},
//          {square: 'b1', type: 'n', color: 'w'},
//          {square: 'c1', type: 'b', color: 'w'},
//          {square: 'd1', type: 'q', color: 'w'},
//          {square: 'e1', type: 'k', color: 'w'},
//          {square: 'f1', type: 'b', color: 'w'},
//          {square: 'g1', type: 'n', color: 'w'},
//          {square: 'h1', type: 'r', color: 'w'}]]


