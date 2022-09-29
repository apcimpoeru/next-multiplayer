import { useState, useEffect, useCallback } from "react";

function useProfileForm(callback, validate){

    const [values, setValues] = useState({
        first_name : '',
        last_name : '',
        email : '',
        phone : '',
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
        if (Object.keys(errors).length == 0 && isSubmitting ) {
            callback();
        }
    } )

    return {handleChange, handleSubmit, values, errors};
}

export default useProfileForm;