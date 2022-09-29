import FormInput from "../../formInput/formInput"
import useSignupForm from "../../../lib/form/signupForm/useSignupForm"
import validateSignupForm from "../../../lib/form/signupForm/validateSignupForm"
import Link from "next/link";

export default function BkSignupForm(props){

    let {handleChange, handleSubmit, values, errors} = useSignupForm(props.submitForm, validateSignupForm);
    console.log('errors', errors);

    if (errors.values){
        //alert('do function with values');
    }

    return (<>

        <form onSubmit={handleSubmit}>

            <FormInput name="first_name" error={errors.first_name} label="First Name" type="text" value={values.first_name ?? ''} onChange={handleChange} />
            <FormInput name="last_name" error={errors.last_name} label="Last Name" type="text" value={values.last_name ?? ''} onChange={handleChange} />
            <FormInput name="email" error={errors.email} label="Email" type="text" value={values.email ?? ''} onChange={handleChange} />
            <FormInput name="password" error={errors.password} label="Password" type="password" value={values.password ?? ''} onChange={handleChange} />
            <FormInput name="password2" error={errors.password2} label="Confirm Password" type="password" value={values.password2 ?? ''} onChange={handleChange} />

            <p>{errors.result}</p>
            <button 
                className={`button bg-primary-button text-white font-bold m-auto mt-12 mb-4`}>
                    Create User
            </button>

            <Link href="/login">
                <a className="w-80 button bg-secondary-button text-black border-2 border-black font-bold m-auto">
                    Login with existing account
                </a>
            </Link>
            
        </form>

    </>)
}
