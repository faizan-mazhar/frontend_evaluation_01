import { useState, useEffect } from 'react'
import { Card, Typography, Button, List, message } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../types'
import './PostList.css'

const { Title, Text } = Typography
const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
      message.error('Failed to load posts')
    }
  }

  if (error) {
    return (
      <div className="error-container">
        <Card>
          <Text type="danger">{error}</Text>
        </Card>
      </div>
    )
  }

  return (
    <div className="post-list-layout">
      <div className="post-list-container">
        <div className="post-list-header">
          <div className="post-list-header-left">
            <FileTextOutlined style={{ fontSize: '24px' }} />
            <Title level={2} className="post-list-title">Posts</Title>
          </div>
          <div className="post-list-buttons">
            <Button onClick={() => navigate('/register')}>Register</Button>
            <Button type="primary" onClick={() => navigate('/posts/add')}>New Post</Button>
          </div>
        </div>

        <Card className="post-card">
          <List
            dataSource={posts}
            renderItem={(post) => (
              <List.Item className="post-item">
                <List.Item.Meta
                  avatar={<div className="post-avatar">{post.id}</div>}
                  title={<span className="post-title" onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}>{post.title}</span>}
                  description={<Text className="post-body">{post.body}</Text>}
                />
                <Button type="link" onClick={() => navigate(`/posts/${post.id}`, { state: { post } })}>View</Button>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  )
}

export default PostList
