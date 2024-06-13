

class WebsocketConnection { 
    private socket: WebSocket;
    private URL: string = process.env.WEBSOCKET_URL || ''

    constructor() { 
        this.socket = new WebSocket(this.URL);

    }
}