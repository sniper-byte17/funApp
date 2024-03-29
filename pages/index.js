import Head from 'next/head'
import Hero from '../components/Hero'
import HomeLayout from '../components/Layouts/HomeLayout'; 

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  )
}

Home.Layout = HomeLayout;
