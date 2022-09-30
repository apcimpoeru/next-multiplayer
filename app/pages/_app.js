import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { SocketContext } from '../lib/socketContext';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function MyApp({ Component, pageProps, props }) {

    const [theSocket, setSocket] = useState({});
    const [placeholder, setPlaceholder] = useState(<></>);

    const socketInitializer = async () => {
      
      await fetch('/api/socket')
      socket = io()
    
      if (socket !== undefined) {

        socket.on('connect', function(){
          const socket = io({ query: { test: 'fme' } });
      })

        setSocket(socket);
      }  
  
    }
  
    useEffect(() => {
        socketInitializer();
    }, []);

    return (
      <SocketContext.Provider value={theSocket}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SocketContext.Provider>
    );
}
  
export default MyApp;

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });

  if (!session) {
    return {
        props: null,
    };
  }

  return {
    props: { session },
  };

}