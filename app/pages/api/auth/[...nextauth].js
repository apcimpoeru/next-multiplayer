import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/authorization';
import { connectToDatabase } from '../../../lib/mongodb';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        
        const client = await connectToDatabase();
        await client.connect();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error('invalid');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('invalid');
        }
        console.log(user);
        client.close();
        return { username: user.username };
      },
    }),
  ],
});
