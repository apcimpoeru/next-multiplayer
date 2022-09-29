import { useState, useEffect } from "react";

export default function _replace_UseForm(callback, validate){

    const [values, setValues] = useState({});
    const [result, setResult] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(e){
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setResult( validate(values) );
        setIsSubmitting(true);
    }

    useEffect( () => {
        if (!result.hasError && isSubmitting ) {
            //callback();
            alert('callback');
        }
    } )

    return {handleChange, handleSubmit, values, result}
}