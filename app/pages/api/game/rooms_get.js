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
    const rooms = await db.collection("test").find({}).toArray()
    //client.close()
    res.status(201).json({ result:rooms });

}
export default handler;