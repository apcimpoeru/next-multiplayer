import Link from "next/link";

export default function Tag(props){

    let name = props.name.replace('&amp;', '&');

    // lowercase string and replace space with -
    let slug = name.toLowerCase().replace(/ /g, '-');

    return (
        <Link href={props.url}>
            <a>
                <div className={`transition-all transition-duration-300 bg-white text-${props.color} inline-block p-2 rounded-md border-2 border-${props.color} mt-2 mr-2
                                hover:bg-${props.color} hover:text-white`}>
                    <p>{name}</p>
                </div>
            </a>
        </Link>
    );
}