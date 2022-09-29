export default async function leaveGameAPI(roomName, socket){

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