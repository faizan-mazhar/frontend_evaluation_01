import { useState, useEffect } from 'react'
import { Button, Card, Typography, Tag, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import type { Post } from '../types'
import './PostDetails.css'

const { Title, Text } = Typography
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function PostDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(location.state?.post || null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!post && id) {
      fetchPost(Number(id))
    }
  }, [id, post])

  const fetchPost = async (postId: number) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      const data = await response.json()
      setPost(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post')
    }
  }

  if (error || !post) {
    return (
      <div className="error-container">
        <Card>
          <Text type="danger">{error || 'Post not found'}</Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="post-details-layout">
      <div className="post-details-container">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/posts')} className="back-button">
          Back to Posts
        </Button>

        <Card className="post-details-card">
          <Space size="middle" className="post-details-header">
            <Tag color="blue">Post #{post.id}</Tag>
            <Tag color="green">User {post.userId}</Tag>
          </Space>
          <Title level={1} className="post-details-title">{post.title}</Title>

          <div className="post-details-content">
            <Text strong className="content-label">Content</Text>
            <div className="content-text">
              {post.body.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>

          <div className="post-details-footer">
            <div className="stat-item">
              <Text className="stat-label">Post ID</Text>
              <Text className="stat-value">{post.id}</Text>
            </div>
            <div className="stat-item">
              <Text className="stat-label">Author ID</Text>
              <Text className="stat-value">{post.userId}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PostDetails
