import { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Card, Typography, Spin, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import type { PostFormData } from '../types'
import './PostAdd.css'

const { Title, Text } = Typography
const { TextArea } = Input
const API_URL = 'https://jsonplaceholder.typicode.com/posts'
const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

interface User {
  id: number
  name: string
}

function PostAdd() {
  const [form] = Form.useForm()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [usersLoading, setUsersLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setUsersLoading(true)
      const response = await fetch(USERS_URL)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      message.error('Failed to load users')
    } finally {
      setUsersLoading(false)
    }
  }

  const handleSubmit = async (values: PostFormData) => {
    try {
      setLoading(true)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: values.userId, title: values.title, body: values.body }),
      })
      if (!response.ok) throw new Error('Failed to create post')
      await response.json()
      message.success('Post created successfully!')
      navigate('/posts')
    } catch (err) {
      message.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-add-layout">
      <div className="post-add-container">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/posts')} className="back-button">
          Back to Posts
        </Button>

        <Card className="post-add-card">
          <div className="post-add-header">
            <Title level={2} className="post-add-title">Create New Post</Title>
            <Text className="post-add-subtitle">Share your thoughts with the world</Text>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="Author" rules={[{ required: true, message: 'Please select a user' }]}>
              <Select placeholder="Select a user" loading={usersLoading} showSearch>
                {users.map((user) => (
                  <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
              <Input placeholder="Enter post title" />
            </Form.Item>

            <Form.Item name="body" label="Content" rules={[{ required: true, message: 'Please enter post content' }]}>
              <TextArea rows={6} placeholder="Write your post content here..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                {loading ? 'Creating Post...' : 'Create Post'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default PostAdd
