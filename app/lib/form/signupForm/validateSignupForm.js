import createUser from "./createUser";

export default async function validateSignupForm(values){

    function setError(errors, name, error){
        errors = {
            ...errors,
            [name]: error,
            hasError: true
        };
        return errors;
    }

    let errors = {};

    if( !values.first_name.trim() ){
        errors = setError(errors, 'first_name', "First name required")
    }
    if( !values.last_name.trim() ){
        errors = setError(errors, 'last_name', "Last name required")
    }
    if( !values.email.trim() ){
        errors = setError(errors, 'email', "Email required")
    }
    if( !values.password.trim() ){
        errors = setError(errors, 'password', "Password required")
    }
    if( !values.password2.trim() ){
        errors = setError(errors, 'password2', "Password confirmation required")
    }

    if (!errors.hasError){
        const result = await createUser();
        errors.values = result;
    }

    return errors;
}