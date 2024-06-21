import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_WEBSOCKET_URL;

export const useSocket = () => { 
    const [socket, SetSocket] = useState<WebSocket | null>(null);

    useEffect(() => { 

        const ws = new WebSocket(URL);

        ws.onopen = () => { 
            SetSocket(ws);
        }

        ws.onclose = () => { 
            SetSocket(null);
        };

        return () => { 
            ws.close();
        }


    }, [])

    return socket
}