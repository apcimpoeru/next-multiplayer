import RockPaperScissors from "../games/rockPaperScissors/rockPaperScissors";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../lib/socketContext";
import GameLoader from "../gameLoader/gameLoader";
import TestGame from "../games/testGame/testGame";
import io from 'socket.io-client';

async function leaveGameAPI(roomName, socket){

    const response = await fetch('/api/game/rooms_update_leave', {
        method: 'POST',
        body: JSON.stringify({ roomName:roomName, socketID:socket.id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    socket.emit('leaving_room', '$' + roomName);
}

export default function gameRoom(){

    const [activeClass, setActiveClass] = useState('hidden');
    const [game, setGame] = useState(<></>);
    const [roomName, setRoomName] = useState('');

    const socket = useContext(SocketContext);

    useEffect(function(){

        if (Object.keys(socket).length !== 0){

            socket.on('start_game', function(roomNameData){

                console.log('%c Starting game ! ' + roomNameData, 'background: #c20000; color: white; padding:10px');

                setActiveClass('');
                setRoomName(roomNameData);

                // let gameComponent = <RockPaperScissors/>;
                let gameComponent = <TestGame roomName={roomNameData} />;

                setGame(<><GameLoader roomName={roomNameData}>{gameComponent}</GameLoader></>);
                
            });

        }

    }, [socket]);

    function leaveRoom(){
        leaveGameAPI(roomName, socket);
        socket.emit('leave_room', roomName);
        setActiveClass('hidden');
        setGame(<></>);
    }

    return <div className={`${activeClass} flex items-center justify-center fixed top-0 left-0 w-full h-full`}>
                <div className="bg-black text-white h-[100vh] w-full flex items-center justify-center overflow-hidden">
                    
                    {game}

                    <div className="fixed bottom-0 right-0 w-full text-center">

                        <p onClick={leaveRoom} className="p-4 font-bold underline cursor-pointer">Leave Room</p>

                    </div>
                    
                </div>
            </div>
}