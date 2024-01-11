// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home({ posts }) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>My blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to my blog</h1>
        {!session ? (
	  <button onClick={() => signIn()}>Sign in</button>
	  ) : (
	    <div>
	    <p>Welcome {session.user.name}</p>
	    <button onClick={() => signOut()}>Sign out</button>
	    </div>
	)}
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <p>{post.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const { posts } = await import('../blog.json')
  return {
    props: {
      posts,
    },
  }
}
