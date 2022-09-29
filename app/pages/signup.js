import Head from 'next/head'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { useState } from 'react'
import { getSession } from 'next-auth/react';
import SignupForm from '../components/forms/signupForm/signupForm';

export default function Signup() {

    return (
      <>
        <Head>
          <title>Sign up</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col h-screen justify-between text-center">
            <Header/>
            <SignupForm/>
            <Footer/>
        </div>
      </>
  )
}





