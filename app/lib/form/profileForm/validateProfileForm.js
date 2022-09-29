export default function validateProfileForm(values){

    let errors = {};

    if( !values.first_name.trim() ){
        errors.first_name = "First name required"
    }
    if( !values.last_name.trim() ){
        errors.last_name = "Last name required"
    }
    if( !values.email.trim() ){
        errors.email = "Contact email required"
    }
    if( !values.last_name.trim() ){
        errors.last_name = "Last name required"
    }

    return errors;
}