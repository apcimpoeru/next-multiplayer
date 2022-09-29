import AuthForm from "../components/forms/auth_form/auth_form"
import Header from "../components/header/header"
import Head from "next/head"
import Footer from "../components/footer/footer"

export default function Home() {
  return <div>

      <Head>
        <title>Log in / Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className="flex flex-col h-screen justify-between text-center">
        <Header/>
        <AuthForm/>
        <Footer/>
    </div>
  </div>
}


