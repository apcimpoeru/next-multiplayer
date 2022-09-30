import Router from 'next/router';

export default async function createRoomAction(e, socket){

    e.preventDefault();

    let name = e.target.name.value ?? "";
    let pwd = e.target.pwd?.value ?? "";
    let type = e.target.type.value ?? "";

    let errors = {};
    if (e.target.name.value == ''){
        errors.name = "Room name required";
    }

    if (Object.keys(errors).length == 0){
        // additional validation
        errors = await createRoomDB(errors, name, pwd, type, socket);
    }

    return errors;

}

async function createRoomDB(errors, name, pwd, type, socket){
    
    // additional validation
    let res = 'Room created!';

    const response = await fetch('/api/game/rooms_post', {
        method: 'POST',
        body: JSON.stringify({ name:name, pwd:pwd, type:type, socketID: socket.id}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (data.result.insertedId != null){
        let emitData = {};
        emitData.name = name;
        emitData.id = socket.id;
        socket.emit('room_created', emitData);
    }

    errors.message = res;
    return errors;
}