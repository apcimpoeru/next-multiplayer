import { useContext, useEffect, useState } from "react";

import getRoomsFromDB from "../../../lib/getRoomFromDB";
import createRoomHTML from "../../../lib/createRoomHTML";

import { SocketContext } from "../../../lib/socketContext";

export default function roomList(props){

    const [rooms, setRooms] = useState('Loading...');
    const [selected, setSelected] = useState(null);

    const socket = useContext(SocketContext);

    useEffect(async () => {

        async function selectItem(e){

            let slug = e.currentTarget.getAttribute("data-name");
            let socketData = [];
            socketData.roomName = slug;
            socketData.socket = socket;
            socket.emit('join_room', slug);
        }

        let data = await getRoomsFromDB();

        let rooms = createRoomHTML(data.result, selected, selectItem);
        setRooms( rooms );

        if (Object.keys(socket).length !== 0){

            socket.on('refresh_rooms', async (data) => {

                data = await getRoomsFromDB();
                rooms = createRoomHTML(data.result, selected, selectItem);
                setRooms( rooms );

            });

            socket.on('start_game', async (data) => {

                data = await getRoomsFromDB();
                rooms = createRoomHTML(data.result, selected, selectItem);
                setRooms( rooms );

            });

        }

    }, [selected, socket]);

    return <>
        {rooms}
    </>

}