import { useEffect, useState } from "react";
import formAction from "./formAction";
import { useRouter } from 'next/router';

import { signIn } from 'next-auth/react';
import FormInput from "../../formInput/formInput";

export default function form(props){

    const values = {};
    const [result, setResults] = useState({});

    async function submitAction(e){

        let username = e.target.username.value;
        let password = e.target.password.value;

        const result = await signIn('credentials', {
            redirect: false,
            email: 'gigi',
            password: 'test',
        });

        e.preventDefault();
        
    }

    return (
        <form onSubmit={submitAction}>
            
            <FormInput 
                inputClasses="mb-4"
                name="username" 
                label="Username" 
                type="text" value={values?.username ?? ''} error={result?.username ?? ''} 
            />

            <FormInput 
                name="password" 
                label="Password" 
                type="text" value={values?.password ?? ''} error={result?.password ?? ''} 
            />

            <button className="button1">Create User</button>

        </form>
    )
}