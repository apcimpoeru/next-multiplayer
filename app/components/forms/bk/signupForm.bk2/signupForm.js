import FormInput from "../../formInput/formInput"
import { useState } from "react";
import signupUseForm from "./signupUseForm";
import signupValidateForm from "./signupValidateForm";
import signupAction from "./signupAction";

export default function SignupForm(props){

    let [isSubmitted, setIsSubmitted] = useState(false);

    let {handleChange, handleSubmit, values, result} = signupUseForm(props.submitForm, signupValidateForm);

    let [formResult, setFromResult] = useState('');

    async function afterValidationHandler(){
        const result = await signupAction(values);
        setFromResult(result);
        setIsSubmitted(true);
    }

    if (result?.result == 'ok' && !isSubmitted){
        afterValidationHandler();
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>{formResult}</p>
            <FormInput name="first_name" error={result?.first_name} label="First Name" type="text" value={values?.first_name ?? ''} onChange={handleChange} />
            <FormInput name="last_name" error={result?.last_name} label="Last Name" type="text" value={values?.last_name ?? ''} onChange={handleChange} />
            <FormInput name="email" error={result?.email} label="Email" type="text" value={values?.email ?? ''} onChange={handleChange} />
            <FormInput name="password" error={result?.password} label="Password" type="password" value={values?.password ?? ''} onChange={handleChange} />
            <FormInput name="password2" error={result?.password2} label="Confirm Password" type="password" value={values?.password2 ?? ''} onChange={handleChange} />

            <button 
                className={`button bg-primary-button text-white font-bold m-auto mt-12 mb-4`}>
                    Create User
            </button>

        </form>
    )
}