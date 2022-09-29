import { useState } from "react";
import FormInput from "../../formInput/formInput"
import replaceAction from "./replaceAction";

export default function replaceForm(){

    const [result, setResults] = useState({});
    const values = {};

    //values.email = 'aa';

    async function submitAction(e){

        const result = await replaceAction(e);
        setResults(result);
        console.log('action');
        
    }

    return (

        <form onSubmit={submitAction}>
            
            <FormInput 
                name="email" 
                label="First Name" 
                type="text" value={values?.email ?? ''} error={result?.email ?? ''} 
            />
            <FormInput 
                name="password" 
                label="First Name" 
                type="text" value={values?.password ?? ''} error={result?.password ?? ''} 
            />
            
            <p>{result?.message}</p>
            
            <button 
                className={`button bg-primary-button text-white font-bold m-auto mt-12 mb-4`}>
                    Create User
            </button>

        </form>

    );
}