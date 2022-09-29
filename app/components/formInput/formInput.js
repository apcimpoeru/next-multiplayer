export default function formInput(props) {
    
    return <>

        <label className={`form-label ${props?.labelClasses ?? ""} ml-4`} htmlFor={props?.name}>{props?.label}</label>
        <input 
            className={`input w-full ${props?.inputClasses ?? ""}`} 
            name={props?.name} 
            type={props?.type} 
            id={props?.name}
            defaultValue={props.defaultValue ?? ""}
            //value={props.value ?? ""}
            onChange={props.onChange}
        />
        <p className="text-error">{props.error ?? ""}</p>
    </>
}