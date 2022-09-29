import FormInput from "../../formInput/formInput"
import { useState } from "react";
import _replace_UseForm from "./_replace_UseForm";
import _replace_ValidateForm from "./_replace_ValidateForm";

export default function _replace_Form(props){

    let {handleChange, handleSubmit, values, result} = _replace_UseForm(props.submitForm, _replace_ValidateForm);

    return (
        <form onSubmit={handleSubmit}>

            <p>{props.result}</p>

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