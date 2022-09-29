export const headerData = {

    logo:'Worky',
    // Text for logout button
    LogoutLink: [
        {
            title: "Logout",
        }
    ],
    // All links
    links: [
        {
            title:"Play",
            href:'/play'
        },
    ],
    links: [
        {
            title:"History",
            href:'/reddit/answered'
        },
    ],
    // Links only for logged out users
    linksLoggedOut: [
        {
            title:"Log in",
            href:'/auth',
        },
        {
            title:"Sign up",
            href:'/signup',
        }
    ],
    // Links only for logged in users
    linksLoggedIn: [
        {
            title:"Profile",
            href:'/profile'
        },
    ]

}