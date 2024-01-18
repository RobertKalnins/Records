// pages/index.js
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";
import React from 'react';

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
	      <div style={{ display: 'flex', alignItems: 'center' }}>
	        <img src={session.user.image} alt={session.user.name} style={{ width: '25px', height: '25px', marginRight: '10px' }} />
	        <p>Welcome {session.user.name}</p>
	      </div>
	      <div>
		<p>Twitch ID: {session.user.id}</p>
 	      </div>
	      <div style={{ marginTop: '1px' }}>
	        <button onClick={() => signOut()}>Sign out</button>
	      </div>
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
