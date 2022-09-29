import Head from 'next/head'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import RoomList from '../components/game/roomList/roomList'
import CreateRoomForm from '../components/game/createRoomForm/createRoomForm'
import GameRoom from '../components/game/gameRoom/gameRoom'
import Selector from '../components/game/selector/selector'

import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { SocketContext } from '../lib/socketContext'
import Link from "next/link"

export default function Test() {


    const socket = useContext(SocketContext);
    const [notLoggedIn, setNotLoggedIn] = useState(<p className='mb-12'>You are not  
                                            <Link href='/auth'>
                                                <a className='underline'> logged in. </a>
                                            </Link> 
                                            You can play, but your score won't be recorded.
                                        </p>);

    return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className='h-[92vh] flex justify-center items-center'>

            <div className='content_wrapper p-12 min-h-full flex flex-col justify-center items-center h-full w-full'>

                <GameRoom/>
                
                {notLoggedIn}

                <Selector/>


            </div>

        </div>
        
        <Footer/>

        </>
    )
}

