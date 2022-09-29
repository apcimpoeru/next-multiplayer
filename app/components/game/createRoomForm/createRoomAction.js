import Router from 'next/router';

export default async function createRoomAction(e, socket){

    e.preventDefault();

    //console.log('socket', socket)
    //console.log('name', e.target.name.value);
    //console.log('pwd', e.target.pwd.value);
    //console.log('type', e.target.type.value);

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

    // console.log("Create room start");
    // console.log(socket.id);

    const response = await fetch('/api/game/rooms_post', {
        method: 'POST',
        body: JSON.stringify({ name:name, pwd:pwd, type:type, socketID: socket.id}),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    //console.log('socket.id', socket.id);
    const data = await response.json();

    //console.log(data);

    if (data.result.insertedId != null){
        let emitData = {};
        emitData.name = name;
        emitData.id = socket.id;
        socket.emit('room_created', emitData);
    }

    errors.message = res;
    return errors;
}