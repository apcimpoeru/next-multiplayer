import { useEffect, useState } from "react";

export default function Pagination(props){

    const [html, setHTML] = useState('');
    
    let currentPage = 12;
    let totalPosts = 1434;
    let postsPerPage = 10;
    let totalPages = Math.ceil(totalPosts / postsPerPage);

    useEffect(function(){
        if (currentPage === 0) {
            setHTML(<>
                        <div>Next</div>
                    </>)
        } else if (currentPage == totalPages ) {
            setHTML(<>
                        <div>Previous</div>
                    </>)
        } else {
            setHTML(<>
                        <div>Previous</div>
                        <div>Next</div>
                    </>)
        }
    }, []);
    

    return <>
    {totalPages}
        {html}
    </>

}