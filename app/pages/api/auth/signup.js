import { connectToDatabase } from '../../../lib/mongodb'
import { hashPassword } from '../../../lib/authorization';

async function handler(req, res) {

    const data = req.body;

    console.log(data);

    const { username, password } = data;

    const client = await connectToDatabase();
    await client.connect();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ username: username });

    let message = '';

    if (existingUser){
        res.status(201).json({ message: 'Account with that username already exists.' });
        client.close();
        return;
    }

    const hashPwd = await hashPassword(password);

    const result = await db.collection('users').insertOne({
        username: username,
        password: hashPwd,
    });

    res.status(201).json({ message:'Account created, you can log in.' });
    client.close();

}
export default handler;