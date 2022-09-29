import PostListing from '../../components/reddit/postListing/postListing'
import Content from '../../components/content/content'

export default function Debug() {

    return (
        <>

        <Content title="Debug" centered={false}>

                <div className='inline-block p-4 w-[70%]'>
                    <PostListing
                        answered={true}
                        url="/api/reddit/getTerms"
                        limit={10}
                        skip={0}
                        term={'nazi'}
                        mini={false}
                    />
                </div>

                <div className='inline-block p-4 w-[29%] align-top'>

                    <p className='text-lg'>Questions with random tag</p>

                    <PostListing
                        answered={true}
                        url="/api/reddit/getTerms"
                        limit={3}
                        skip={0}
                        term={'CN'}
                        mini={true}
                    />
                </div>

        </Content>

        </>
    )
}

