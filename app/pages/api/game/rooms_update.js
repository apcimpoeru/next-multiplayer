import clientPromise from '../../../lib/mongodb-api'
import NextCors from 'nextjs-cors';

async function handler(req, res) {

    // const ids = ['622693b86ddc5cf0efbe8715', '6226946e6ddc5cf0efbe8716'];
    // 
    // const convertedIds = ids.map(id => {
    //     return new ObjectId(id);
    // })

    const ObjectId = require('mongodb').ObjectId;

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


    const result = await db.collection('test').find(
        { connected: { $eq: '3' } }
    ).toArray();

    let joinedRoomsID = [];
    let joinedRoomsName = [];

    result.forEach(function(el, i){

        let id = el._id;
        let name = el.title;

        joinedRoomsID.push(new ObjectId(id));
        joinedRoomsName.push(name);

    });

    client.close()
    res.status(201).json({ result:result[0]._id });

}
export default handler;