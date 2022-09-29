import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Head from 'next/head'
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';

const Post = () => {

  const router = useRouter();
  const [post, setPost] = useState('');

  const [question, setQuestion] = useState('');
  const [text, setText] = useState('');
  const [replies, setReplies] = useState('');
  const [id, setID] = useState('');

  async function getPost(id){

    const response = await fetch('/api/reddit/post', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    console.log(data);

    setID(data.thread.id);
    setQuestion(data.thread.title);
    setText(data.thread.text);

    const comments = data.comments.comment;

    function htmlDecode(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }

    ;

    const commentsHtml = comments.map((comm, index) => {
      return (
        <div key={index} className="comment border-l-2 border-black pl-4 mb-12">
          <div className="comment-author">
            <div dangerouslySetInnerHTML={{__html: htmlDecode(comm.answer.body_html)}} />
          </div>
          <p className='mt-6'>By <span className='font-bold'>{comm.answer.author}</span></p>
        </div>
      )
    });

    setReplies(commentsHtml);

  }

  useEffect(async () => {

      if (router.asPath !== router.route) {
          // router.query.lang is defined
          let roomName = router.query.slug;
          setPost(roomName);

          const data = await getPost(roomName);

      }

  }, [router])

  return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className='min-h-[92vh] flex'>

            <div className='content_wrapper p-12 min-h-full flex flex-col h-full'>

                <Link href={`/reddit/answered?id=${id}`}>
                  <a className="mb-4 font-bold underline">Back</a>
                </Link>

                <h2 className='text-2xl mb-8'>{question}</h2>
                <p className='mb-8'>{text}</p>

                <div className='replies'>
                  {replies}
                </div>

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

export default Post