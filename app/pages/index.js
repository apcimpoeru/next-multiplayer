import Head from 'next/head'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useEffect } from 'react'

async function getRoomsFromDB(){
  const response = await fetch('/api/game/rooms_get', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json();
  return data;
}

export default function Home() {

  useEffect(async function(){
    const data = await getRoomsFromDB();
  }, [])

  return (
      <>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col h-screen justify-between text-center">
            <Header/>
            <p>Home sweet home</p>
            <Footer/>
        </div>
      </>
  )
}

