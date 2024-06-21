import { Chess } from "chess.js";
import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "./Game";
import { reverseBoard } from "../functions/utils";

export default function ChessBoard({
  board,
  chess,
  socket,
  setBoard,
  color,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  chess: Chess;
  socket: WebSocket | null;
  color: string;
}) {
  const [from, SetFrom] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="text-black">
        {board.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                if (color === "black") { 
                  var squareRepresentation =
                  String.fromCharCode(104 - (j % 8)) + `${i + 1}`;
                } else { 

                  var squareRepresentation =
                    String.fromCharCode(97 + (j % 8)) + `${8 - i}`;
                }
                return (
                  <div
                    key={j}
                    className={`w-16 h-16 ${
                      (i + j) % 2 === 0 ? "bg-green-300" : "bg-white"
                    } flex items-center justify-center`}
                    onClick={() => {
                      if (!from) {
                        SetFrom(square?.square);
                      } else {
                        const move = {
                          from: from,
                          to: squareRepresentation,
                        };

                        // validate the move
                        console.log(move);
                        try { 

                          chess.move(move);
                        } catch { 
                          SetFrom(undefined)
                          return
                        }

                        // update the board
                        setBoard(color === "black" ? reverseBoard(chess.board()) :  chess.board());
                        // send move to server
                        socket?.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: move,
                          })
                        );

                        SetFrom(undefined);
                      }
                      console.log("clicked");
                    }}
                  > 
                   {/* if square then src = color + square.type */}
                    
                    {square ? <img src={`/${square.color}${square.type}.png`}></img> : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
