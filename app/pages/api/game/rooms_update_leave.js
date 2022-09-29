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

    console.log('');
	console.log('');
	console.log('room name', roomName);
	console.log('connectedID', connectedID);
	console.log('room', room);
	console.log('');
	console.log('');

	if (typeof room !== 'undefined' && room.length > 0) {

	    let roomMembers = room[0].connected;

	    if (typeof roomMembers !== 'undefined' && roomMembers.length > 0){

	    	const index = roomMembers.indexOf(connectedID);
			if (index > -1) {
			  roomMembers.splice(index, 1); // 2nd parameter means remove one item only
			}

			let actionResult;

			if (roomMembers.length > 0){

				actionResult = await db.collection('test').updateOne(
				   { title: room[0].title },
				   [
				      { $set: { connected: roomMembers } },
				   ]
				)

			} else {

				actionResult = await db.collection('test').remove(
				   { title: room[0].title }
				)

			}

	    	client.close();

	    	await actionResult;

	    	if (actionResult?.acknowledged == true){
	    		res.status(201).json({ result:true });
	    	} else {
	    		res.status(400).json({ result:'error_on_update' });
	    	}

	    }

	} else {

		res.status(201).json({ result:'no_rooms_found' });

	}

}