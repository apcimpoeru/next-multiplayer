async function afterValidationHandle(values){
    const result = await test(values);
    return result;
}

async function test(values){
    return values;
}

export default function _replace_validateForm(values){

    function setError(result, name, error){
        result = {
            ...result,
            [name]: error,
            hasError: true
        };
        return result;
    }

    let result = {result: 'ok'};

    if (!values?.email){
        result = setError(result, 'email', "Email required");
    }
    if (!values?.password){
        result = setError(result, 'password', "Password required");
    }

    return result;

}
