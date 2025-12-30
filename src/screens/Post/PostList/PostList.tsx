import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from 'antd'
import type { Post } from '../types'
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setError('Failed to fetch posts'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ maxWidth: 600, margin: '20px auto' }}>
      <h2>Posts</h2>
      <div style={{ marginTop: 20 }}>
        {posts.map((post, index) => (
          <div key={post.id} style={{ padding: 10, border: '1px solid #ddd', marginBottom: 10 }}>
            <div style={{ fontWeight: 'bold', marginBottom: 5 }}>
              {index + 1}.{' '}
              <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                {post.title}
              </Link>
            </div>
            <div>{post.body}</div>
            <Link to={`/posts/${post.id}`}>
              <Button style={{ marginTop: 10 }}>View</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostList
