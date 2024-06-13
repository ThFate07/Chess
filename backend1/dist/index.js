"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const GameHandler = new GameManager_1.GameManager();
const wss = new ws_1.WebSocketServer({ port: 8080 });
// on connection add to que
wss.on('connection', function connection(ws) {
    // add user and emit message init_game
    GameHandler.addUser(ws);
    ws.on("disconnect", () => GameHandler.removeUser(ws));
});
