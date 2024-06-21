"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
        // validate move
        if (this.moves.length % 2 === 0 && socket != this.player1) {
            return;
        }
        if (this.moves.length % 2 === 1 && socket != this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) { }
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: move,
            }));
            this.player2.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: move,
            }));
            return;
        }
        console.log(this.moves.length, this.moves.length % 2);
        if (this.moves.length % 2 === 0) {
            console.log("sending move to black");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move,
            }));
        }
        else {
            console.log("sending move to white");
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move,
            }));
        }
        // adding the move
        this.moves.push(move);
    }
}
exports.Game = Game;
