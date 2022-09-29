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

	console.log('---------------- START -----------------');

	await clientPromise;
    const client = await clientPromise;
    await client.connect();    
    const db = client.db();

    const room = await db.collection('test').find(
        { 'title' : roomName },
    ).toArray();

	if (typeof room !== 'undefined' && room.length > 0) {

	    let roomMembers = room[0].connected;

	    if (typeof roomMembers !== 'undefined' && roomMembers.length > 0){

	    	roomMembers.push(connectedID);

	    	const result = await db.collection('test').updateOne(
			   { title: room[0].title },
			   [
			      { $set: { connected: roomMembers } },
			   ]
			)

	    	console.log('------------------END ---------------');
	    	//client.close();
	    	console.log('------------------END2 ---------------');
	    	if (result.acknowledged == true){
	    		res.status(201).json({ result:true });
	    	} else {
	    		res.status(400).json({ result:'error_on_update' });
	    	}

	    }

	} else {

		console.log('------------------END ---------------');
		//client.close();
		console.log('------------------END2  ---------------');
		res.status(201).json({ result:'no_rooms_found' });

	}

}