async function createUser(errors){
    // additional validation
    let res = 'asd';
    errors.message = res;
    return errors;
}

export default async function signupAction(e){

    e.preventDefault();

    let errors = {};
    if (e.target.email.value == ''){
        errors.email = "Email required";
    }

    if (Object.keys(errors).length == 0){
        // additional validation
        errors = await createUser(errors);
    }

    return errors;

}