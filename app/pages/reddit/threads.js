import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import { useContext, useEffect } from 'react'
import { data } from 'autoprefixer'
import { comment } from 'postcss'

import Classifier from 'ml-classify-text'

export default function Test() {


    async function getThreads(){

        const response = await fetch('/api/reddit/threads', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        console.log(data);

    }



    useEffect(async function(){

        // call getThreads() every second
        const interval = setInterval(async function(){
            await getThreads();
        } , 2000);

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

