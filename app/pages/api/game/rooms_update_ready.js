import clientPromise from '../../../lib/mongodb-api'
import NextCors from 'nextjs-cors';


export default async function handler(req, res) {

	await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

	let connectedID = req.body.socketID;
	let roomName = req.body.roomName;

	await clientPromise;
    const client = await clientPromise;
    await client.connect();    
    const db = client.db();

    const room = await db.collection('test').find(
        { 'title' : roomName },
    ).toArray();

	if (typeof room !== 'undefined' && room.length > 0) {

		let maxPlayers = room[0].maxPlayers;
		let roomReady = [];

	    if (typeof room[0].ready !== 'undefined' && room[0].ready.length > 0){

	    	roomReady = room[0].ready;  	

	    } 

	    roomReady.push(connectedID);

	    let set = {};

    	const result = await db.collection('test').updateOne(
		   { title: room[0].title },
		   [
		      { $set: { ready: roomReady } },
		   ]
		)

    	let result_msg;

		if (roomReady.length == maxPlayers){
	    	result_msg = true;
	    }

    	client.close();

    	if (result.acknowledged == true){
    		res.status(201).json({ result:true, ready:result_msg });
    	} else {
    		res.status(400).json({ result:'error_on_update' });
    	}

	} else {

		res.status(201).json({ result:'no_rooms_found' });

	}

}