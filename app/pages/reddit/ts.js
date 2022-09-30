import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import { useContext, useEffect } from 'react'

export default function Test() {


    async function test(){

        const response = await fetch('/api/reddit/test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        let result = data.result;

    }



    useEffect(async function(){

        test();

    }, [])

    return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className='h-[92vh] flex justify-center items-center'>

            <div className='content_wrapper p-12 min-h-full flex flex-col justify-center items-center h-full'>

                <p>Hi</p>

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

