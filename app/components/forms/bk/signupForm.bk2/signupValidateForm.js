export default function signupValidateForm(values){
    
    let result = {};

    function setError(result, name, error){

        result = {
            ...result,
            [name]: error,
            hasError: true
        };
        return result;

    }


    if (!values?.email){
        result = setError(result, 'email', 'Email required');
    }
    if (!values?.password){
        result = setError(result, 'password', 'Password required');
    }

    if ( !result.hasError ){
        result = {result:'ok'};
    }

    console.log('result', result);

    return result;

}
