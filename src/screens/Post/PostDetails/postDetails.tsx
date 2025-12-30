import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import type { Post } from '../types'

const { Title, Text } = Typography
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function PostDetails() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(() => setPost(null))
        .finally(() => setLoading(false))
    }
  }, [id])

  if (loading) return <div>Loading post...</div>
  if (!post) return <div>Post not found</div>

  return (
    <div style={{ maxWidth: 600, margin: '20px auto' }}>
      <Link to="/posts"><Button>Back to Posts</Button></Link>

      <div style={{ marginTop: 20 }}>
        <Title level={3}>{post.title}</Title>
        <Text strong>Content:</Text>
        <div style={{ marginTop: 10 }}>{post.body}</div>
        <div style={{ marginTop: 10 }}>
          <Text>Post #{post.id}</Text> | <Text>User {post.userId}</Text>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
