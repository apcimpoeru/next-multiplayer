import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Card from '../../../components/reddit/card/card';
import Head from 'next/head'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

const Post = () => {

  const router = useRouter();
  const [term, setTerm] = useState('');

  const [question, setQuestion] = useState('');
  const [text, setText] = useState('');
  const [replies, setReplies] = useState('');
  const [id, setID] = useState('');

  const [cardHtml, setCardHtml] = useState('');

  function getAnswersHtml(d){

    const dd = d.result;

    const html = dd.map(el => {

        return <Card data={el} />

    });

    return html;
}

  async function getPosts(term){

    const response = await fetch('/api/reddit/getTerms', {
        method: 'POST',
        body: JSON.stringify({ term:term }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    const html = await getAnswersHtml(data);

    setCardHtml(html);

  }

  useEffect(async () => {

      if (router.asPath !== router.route) {
          // router.query.lang is defined
          let term = router.query.slug;
          setTerm(term);
          const data = await getPosts(term);
      }

  }, [router])

  useEffect(async () => {

  } ,[cardHtml])

  return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className='min-h-[92vh] flex'>

            <div className='content_wrapper p-12 min-h-full flex flex-col h-full'>

                <div className='replies'>
                  {cardHtml}
                </div>

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

export default Post