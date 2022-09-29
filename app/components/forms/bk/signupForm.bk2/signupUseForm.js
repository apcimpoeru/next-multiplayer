import { useState } from "react";

export default function signupUseForm(callback, validate){

    const [values, setValues] = useState({});
    const [result, setResult] = useState({});
    
    function handleChange(e){
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setResult(validate(values));
    }

    return {handleChange, handleSubmit, values, result}
}