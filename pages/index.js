import Head from 'next/head'
import Image from 'next/image';
import { getSession, signOut, useSession} from 'next-auth/react';
import IndexHeader from '../components/IndexHeader';
import SideBar from '../components/SideBar';
import { useRouter } from 'next/router';
import Feed from '../components/Feed';
import Modal from "../components/Modal";
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { connectToDatabase } from '../util/mongodb'
import Widgets from '../components/Widgets';

export default function Home({ posts, newsItems }) {
  
  // const { data: session } = useSession();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    }
  });
  
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div
      className='bg-gray-100 dark:bg-gray-900 dark:text-white 
      h-screen overflow-y-scroll md:space-y-6'>
      <Head>
        <meta
          name='description'
          content='This is a LinkedIn Clone App by Chukwu Matthew (codeMat)'
        />
        <title>LinkedIn Clone | Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <IndexHeader />

      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <SideBar />
          <Feed posts={posts} />
        </div>

        <Widgets newsItems={newsItems} />

        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      }
    };
  }

  // Get posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db.collection("posts").find().sort({ timestamp: -1 }).toArray();


  //Get Google news API
  const newsResults = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      session,
      newsItems: newsResults.articles.slice(0, 5),
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      }))
    }
  }
}
