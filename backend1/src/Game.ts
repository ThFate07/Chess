import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
import { json } from "react-router-dom";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: { from: string; to: string }[];
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }

  makeMove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
    // validate move
    if (this.moves.length % 2 === 0 && socket != this.player1) {
      return;
    }
    if (this.moves.length % 2 === 1 && socket != this.player2) {
      return;
    }

    try {
      this.board.move(move);
    } catch (e) {
        return
    }

    if (this.board.isGameOver()) {
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: move,
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: move,
        })
      );
      return;
    }

    console.log(this.moves.length, this.moves.length % 2);
    if (this.moves.length % 2 === 0) {
      console.log("sending move to black");
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      console.log("sending move to white");
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }

    // adding the move
    this.moves.push(move);
  }
}
