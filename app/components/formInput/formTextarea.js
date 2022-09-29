export default function formTextarea(props){
    return(
        <>
            <label className={`form-label block mb-2 ${props?.labelClasses ?? ""}`} htmlFor={props?.name}>{props?.label}</label>
            <textarea
                className={`input w-full ${props?.inputClasses ?? ""}`}
                name={props?.name}
            />
            <p className="text-error">{props.error ?? ""}</p>
        </>
    )
}