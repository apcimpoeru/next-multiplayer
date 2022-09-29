import { Server } from 'socket.io'

async function leaveGameAPI(roomName, socket, io){

  const response = await fetch('http://localhost:3000/api/game/rooms_update_leave', {
      method: 'POST',
      body: JSON.stringify({ roomName:roomName, socketID:socket.id }),
      headers: {
          'Content-Type': 'application/json',
      },
  });
  
  const data = await response.json();
  socket.to('#main').emit('refresh_rooms');
  socket.leave('$' + roomName);
}

async function joinGameAPI(roomName, socket, io){

  const response = await fetch('http://localhost:3000/api/game/rooms_update_join', {
      method: 'POST',
      body: JSON.stringify({ roomName:roomName, socketID:socket.id }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json();
  if (data.result == true){
    io.to(socket.id).emit('start_game', roomName);
  } else {
    console.log('');
    console.log('');
    console.log('Error on game ! ' + roomName);
    console.log('');
    console.log('');
  }
}

const SocketHandler = (req, res) => {


  if (res.socket.server.io) {
    //console.log('Socket is already running')
  } else {
    
    //console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
        

        // join the main room
        socket.join('#main');

        socket.on('player_action_server', function(data){
          socket.to('$' + data.room).emit('player_action_client', data);
        });

        socket.on('new_game_server', function(data){
          io.in('$' + data).emit('new_game_client');
        });

        socket.on('end_game_server', function(data){
          io.in('$' + data).emit('end_game_client');
        })

        socket.on('all_ready_server', function(roomName){
          io.in('$' + roomName).emit('all_ready_client', roomName);
        })

        socket.on('join_room', function(roomName){

          joinGameAPI(roomName, socket, io);
          socket.join('$' + roomName);
          io.in('#main').emit('refresh_rooms');
          
        });

        socket.on('leaving_room', function(data){
          socket.leave(data);
          io.in('#main').emit('refresh_rooms');
          io.in(data).emit('user_left');
        });

        socket.on('room_created', function(data){
            socket.to('#main').emit('refresh_rooms');
            io.to(data.id).emit('start_game', data.name);
            socket.join('$' + data.name);
        })

        socket.on('disconnecting', function(){
          for (let room of socket.rooms) {
            if (room.startsWith('$')) {
              let roomName = room.replace('$', '');
              leaveGameAPI(roomName, socket, io);
              io.in(room).emit('user_left');
            }
          }
        });


    })

  }
  res.end()
  
}

export default SocketHandler