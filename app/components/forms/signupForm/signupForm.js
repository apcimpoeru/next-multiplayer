import { signIn } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignupForm(){

    const values = {};
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    async function submitHandler(e){

        setErrors({});

        let hasError = false;
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        let email = emailRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;

        let error = {};

        if (!username){
            error.username = 'Username is required';
            hasError = true;
        }

        if (username.length < 3){
            error.username = 'Username must be at least 4 characters';
            hasError = true;
        }

        if (!password){
            error.password = 'Password is required';
            hasError = true;
        }

        if (password.length < 2){
            error.password = 'Password must be at least 2 characters';
            hasError = true;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            error.email = 'Invalid email';
            hasError = true;
        }

        if (password !== confirmPassword){
            error.confirmPassword = 'Passwords do not match';
            hasError = true;
        }

        if (hasError){
            setErrors(error);
        } else {

            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }

            const result = await signIn('credentials', {
                redirect: false,
                email: username,
                password: password,
            });
    
            if (!result.error){
                router.replace('/');
            }

        }


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
                <p className="formError">{errors.username}</p>
            </div>

            <div className="mt-4">
                <label className={`form-label ml-4`} htmlFor="password">Email</label>
                <input 
                    className={`input w-full`} 
                    name='username'
                    type='email'
                    id='password'
                    ref={emailRef}
                />
                <p className="formError">{errors.email}</p>
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
                <p className="formError">{errors.password}</p>
            </div>

            <div className="mt-4">
                <label className={`form-label ml-4`} htmlFor="confirm_password">Confirm Password</label>
                <input 
                    className={`input w-full`} 
                    name='confirm_password'
                    type='password'
                    id='confirm_password'
                    ref={confirmPasswordRef}
                />
                <p className="formError">{errors.confirmPassword}</p>
            </div>

            <p>{errors.result}</p>

            <div className="mt-8 flex flex-col">

                <button onClick={submitHandler} className="button1 mb-12">Sign Up</button>
                <p className="mb-4">Already have an account?</p>

                <Link href="/auth">
                    <a className="button2 mb-2">Log in</a>
                </Link>

            </div>
    </div>
}