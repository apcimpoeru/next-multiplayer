import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'

import getTermsJSON from '../../lib/reddit/getTermsJSON';
import TermList from '../../components/reddit/TermList';

import { useState, useEffect } from 'react';

export default function Test() {

    // 
    const [terms, setTerms] = useState('');

    let countryData = getTermsJSON();

    function matchTerms(string, data){
        
        let matched = [];

        // loops through all data objects
        for (const [key, value] of Object.entries(data)) {

            // loops through terms
            for (let term of value.terms){

                let regex = new RegExp("\\b" + term.toLowerCase() + "\\b");
                
                let result = string.toLowerCase().match(regex);

                if (result != null) {
                    matched.push(key );
                    //console.log(term, string);
                }

            }

        }

        return matched;

    }

    async function updateTerms(id, terms){

        const response = await fetch('http://localhost:3000/api/reddit/updateTerms', {
            method: 'POST',
            body: JSON.stringify({ id:id, terms:terms }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json(); 
        return data;

    }

    async function matchTermsWithPostDB(){

        let k = 0;
        let kk = 0;

        const response = await fetch('/api/reddit/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }

        console.log('-----------------------------------------------------');
        console.log('comments to check: ' + data.result.length);
        console.log(data);

        for (let post of data.result){

            let title_match = matchTerms(post.title, countryData);
            if (true){

                const update = await updateTerms(post.id, '');

                console.log('id', post.id);
                console.log('title', post.title);
                console.log('title match', title_match);
                console.log('update', update);
                console.log('-----------------------------');

            }

        }
        // console.log('title', k);
        // console.log('text', kk);
    }
    
    async function getTerms(terms){
            
        const response = await fetch('http://localhost:3000/api/reddit/getTerms', {
            method: 'POST',
            body: JSON.stringify({ terms:terms }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        const data = await response.json();
        
        console.log(data);
    }


    useEffect(async function(){

        matchTermsWithPostDB();

    }, [])

    return (
        <>
        <Head>
            <title>Play</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header/>

        <div className=''>

            <div className='p-16'>

                <TermList/>

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

