import FormInput from "../../formInput/formInput"

import { signIn } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function authForm(){

    const values = {};
    const [error, setError] = useState('');
    const usernameRef = useRef();
    const passwordRef = useRef();
    const router = useRouter();

    async function submitHandler(e){

        setError('');
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            username: username,
            password: password,
        });

        if (!result.error){
            router.push('/');
        } else {
            setError('Wrong username or password');
        }

        console.log(result);

    }

    return <div className="flex flex-col justify-center items-center">

            <div>
                <label className={`form-label ml-4`} htmlFor="username">Username</label>
                <input 
                    className={`input w-full`} 
                    name='username'
                    type='text'
                    id='username'
                    ref={usernameRef}
                />
            </div>

            <div className="mt-4">
                <label className={`form-label ml-4`} htmlFor="password">Password</label>
                <input 
                    className={`input w-full`} 
                    name='username'
                    type='password'
                    id='password'
                    ref={passwordRef}
                />
            </div>

            <p className="mt-8 mb-8 font-bold">{error}</p>

            <div className="flex flex-col">

                <button onClick={submitHandler} className="button1 mb-12">Login</button>
                <p className="mb-4">Don't have an account?</p>

                <Link href="/signup">
                    <a className="button2 mb-2">Sign up</a>
                </Link>

            </div>
    </div>
}