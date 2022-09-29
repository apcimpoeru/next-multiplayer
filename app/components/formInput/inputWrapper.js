export default function inputWrapper(props){
    return <>
        <div className={`mb-4 w-full ${props?.wrapperClasses ?? ''}`}>
            {props.children}
        </div>
    </>
}