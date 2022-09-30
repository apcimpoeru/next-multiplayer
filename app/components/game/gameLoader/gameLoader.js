import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../../lib/socketContext";

async function leaveRoomAPI(){
    const response = await fetch('/api/game/rooms_update_leave', {
        method: 'POST',
        body: JSON.stringify({ name:roomName }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

}

async function setRoomReady(roomName, socket){

    const response = await fetch('/api/game/rooms_update_ready', {
        method: 'POST',
        body: JSON.stringify({ roomName:roomName, socketID: socket.id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.ready == true){
        socket.emit('all_ready_server', roomName);
    }
}

export default function gameLoader(props){
    

    let gameComponent = props.children;
    const socket = useContext(SocketContext);

    const [ready, setReady] = useState(false);
    const [game, setGame] = useState(null);
    const [activeClass, setActiveClass] = useState('');

    useEffect(function(){

        socket.on('all_ready_client', function(roomName){
            setGame(props.children);
            setActiveClass('hidden');
        })

    }, [socket]);

    useEffect(function(){

        

    }, []);

    function isReady(){
        if (!ready){
            setReady(true);
            setRoomReady(props.roomName, socket);
        }
    }
    return  <div>  
                {game}
                <button className={`${activeClass} cursor-pointer`} onClick={isReady}>{ready ? "Ready! Waiting for others" : "Ready?"}</button>
            </div>
}