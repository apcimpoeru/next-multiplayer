import Link from "next/link";
import {headerData} from '../../datas/headerData'
import { signOut, useSession } from "next-auth/react";

function Header(){
    

    const session = useSession();
    let allLinks = headerData.links;
    let loggedLinks = null;
    let logoutLink = null;

    if (!session.data){
        loggedLinks = headerData.linksLoggedOut;
        logoutLink = null;
    } else {
        loggedLinks = headerData.linksLoggedIn;
        logoutLink = (<li className="inline-block mx-8">
            <a onClick={signOut} className="hover:text-secondary text-lg cursor-pointer">{headerData.LogoutLink[0].title}</a>
        </li>);
    }

    allLinks = allLinks.concat(loggedLinks);

    const menuItems = allLinks.map(function(item, i){

        const title = item.title;
        const href = item.href;

        return <li key={i} className="inline-block mx-8">
            <Link href={href}>
                <a className="hover:text-secondary text-lg cursor-pointer">{title}</a>
            </Link>
        </li>
    });
    
    
    return <div className="h-[8vh] p-4 bg-primary text-white flex">

        <div className="inline-block w-2/5 text-4xl h-full flex justify-center items-center">
            <Link
            href="/">
                <a>
                    {headerData.logo}
                </a>
            </Link>
        </div>

        <div className="inline-block w-3/5 text-center h-full flex justify-center items-center">
            <ul>
                {menuItems}
                {logoutLink}
            </ul>
        </div>

    </div>
}

export default Header;
