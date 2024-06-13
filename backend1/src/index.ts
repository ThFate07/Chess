import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import { Game } from './Game';
import { INIT_GAME } from './messages';
const GameHandler = new GameManager()
const wss = new WebSocketServer({ port: 8080 });

// on connection add to que
wss.on('connection', function connection(ws) {
 
  // add user and emit message init_game
  GameHandler.addUser(ws);

  ws.on("disconnect", () => GameHandler.removeUser(ws));
  
});

