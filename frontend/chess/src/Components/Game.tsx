// chessboard, timeclock,chatbox, text like pieces

import { useEffect } from "react"

export function Game() { 
    useEffect(() => { 
        // initialize websocket and end when restarted
        // const socket = new WebSocket("ws://localhost:8080");
        console.log(process.env.WEBSOCKET_URL)


    }, [])
    return ( 
        <>
        </>
    )
}