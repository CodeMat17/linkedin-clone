import Head from "next/head"
import Image from "next/image"
import HeaderLinks from "../components/HeaderLinks"
import HomePageLinks from "../components/HomePageLinks";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { getProviders, signIn } from 'next-auth/react';

function home({ providers }) {
    
    return (
        <div className="px-4 max-w-4xl mx-auto space-y-10 relative">
            <Head>
                <meta name="description" content="This is a LinkedIn Clone App by Chukwu Matthew (codeMat)" />
                <title>SignIn | LinkedIn Clone</title>                
            </Head>
            
            <header className="flex items-center justify-between py-4">
                {/* Home page header */}
                <div className="flex items-end">
                    <h1 className="text-xl text-gray-700 font-semibold">Linked</h1>
                    <svg className="w-8 h-8 text-blue-600" viewBox="3 0 24 24">
                        <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                    </svg>
                </div>
                {/* Home page links */}
                <HeaderLinks providers={providers}/>
            </header>

            {/* Main */}
            <main>
                <div className="flex flex-col lg:flex-row items-center max-w-3xl mx-auto lg:mx-0">
                    <div className="space-y-6 lg:space-y-10">
                        <h1 className="text-3xl md:text-4xl text-amber-600/80 max-w-md !leading-snug">
                            Welcome to your professional community
                        </h1>
                        <div className="space-y-4">
                            <HomePageLinks
                                Icon={ArrowForwardIosRoundedIcon}
                                text='Search for a job'
                            />
                            <HomePageLinks
                                Icon={ArrowForwardIosRoundedIcon}
                                text='Find a person you know'
                            />
                            <HomePageLinks
                                Icon={ArrowForwardIosRoundedIcon}
                                text='Learn a new skill'
                            />
                        </div>
                    </div>
                    <div
                        className="relative lg:absolute h-80 w-80 
                        lg:w-[400px] lg:h-[400px] top-12 lg:top-24 right-5">
                        <Image
                            src="https://rb.gy/vkzpzt"
                            layout="fill"
                            priority
                            objectFit="contain"
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default home;

export async function getServerSideProps(context) {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}
