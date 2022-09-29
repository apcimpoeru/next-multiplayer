import { useState, useEffect, useCallback } from "react";

export default function useSignupForm(callback, validate){

    const [values, setValues] = useState({
        first_name : '',
        last_name : '',
        email : '',
        password : '',
        password2 : '',
    });

    const [errors, setErrors] = useState({});
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
        setErrors(validate(values));
        setIsSubmitting(true);
    }

    useEffect( () => {
        if (!errors.hasError && isSubmitting ) {
            callback(values);
        }
    } )

    return {handleChange, handleSubmit, values, errors};
}
