import clientPromise from '../../../lib/mongodb-api'
import NextCors from 'nextjs-cors';

async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    
    await clientPromise
    const client = await clientPromise
    await client.connect();    
    const db = client.db()

    let connectedID = [];
    connectedID.push(req.body.socketID);

    const result = await db.collection('test').insertOne({
        
        title: req.body.name,
        type: req.body.type,
        pwd: req.body.pwd,
        connected: connectedID,
        maxPlayers: 2,

    });

    client.close()
    res.status(201).json({ result:result });


    

}
export default handler;