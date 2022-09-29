import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import { useState } from 'react';

export default function Content(props) {

    const [class1, setClass1] = useState('');
    const [class2, setClass2] = useState('');

    if (props.centered && class1 === '') {
        setClass1('flex justify-center items-center');
    }

    if (props.centered && class2 === '') {
        setClass2('min-h-full flex flex-col justify-center items-center h-full w-full');
    }

    return (
        <>
        <Head>
            <title>{props.title ?? "No title"}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className={`min-h-[92vh] ${class1}`}>

            <div className={`content_wrapper p-12 ${class2}`}>

                {props.children}

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

