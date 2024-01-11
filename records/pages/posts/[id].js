// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const { posts } = await import('../../blog.json')

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { posts } = await import('../../blog.json')
  const post = posts.find((post) => post.id.toString() === params.id)
  return {
    props: {
      post,
    },
  }
}
