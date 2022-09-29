import { useState, useEffect, useContext } from "react";
import FormInput from "../../formInput/formInput"
import createRoomAction from "./createRoomAction";
import FormSelect from "../../formInput/formSelect";
import { SocketContext } from "../../../lib/socketContext";

export default function createRoomForm(props){

    const socket = useContext(SocketContext);

    const [result, setResults] = useState({});
    const [loading, setLoading] = useState('');

    const values = {};

    async function submitAction(e){

        setLoading('Creating room...');
        const result = await createRoomAction(e, socket);
        setResults(result);
        setLoading('');
    }

    return (

        <form onSubmit={submitAction}>
            
            <FormInput 
                name="name" 
                placeholder="Room name" 
                type="text" value={values?.name ?? ''} error={result?.name ?? ''} 
            />

            <FormSelect
                name="type"
                value={values?.pwd ?? ''} error={result?.pwd ?? ''}
            /> 
            
            <p className="mt-4">{result?.message}</p>
            <p className="mt-4">{loading}</p>
            <button 
                className={`formSubmit`}>
                    Create Room
            </button>

        </form>

    );
}