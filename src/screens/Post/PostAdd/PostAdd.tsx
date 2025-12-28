import { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Typography, Layout, theme, message, Select } from 'antd'
import { 
  FormOutlined, 
  UserOutlined,
  ArrowLeftOutlined 
} from '@ant-design/icons'
import type { PostFormData } from '../types'
import './PostAdd.css'

const { Title, Text } = Typography
const { Content } = Layout
const { TextArea } = Input

const API_URL = 'https://jsonplaceholder.typicode.com/posts'
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

interface User {
  id: number
  name: string
}

interface PostAddProps {
  onBack?: () => void
  onSuccess?: () => void
}

function PostAdd({ onBack, onSuccess }: PostAddProps) {
  const [form] = Form.useForm<PostFormData>()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const { token } = theme.useToken()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setUsersLoading(true)
      const response = await fetch(USERS_API_URL)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data.map((user: User) => ({ id: user.id, name: user.name })))
    } catch (error) {
      console.error('Error fetching users:', error)
      message.error('Failed to load users')
    } finally {
      setUsersLoading(false)
    }
  }

  const onFinish = async (values: PostFormData) => {
    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const data = await response.json()
      console.log('Post created:', data)
      message.success('Post created successfully!')
      form.resetFields()
      onSuccess?.()
    } catch (error) {
      console.error('Error creating post:', error)
      message.error('Failed to create post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="post-add-layout">
      <Content className="post-add-content">
        <div className="post-add-container">
          {onBack && (
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              className="back-button"
            >
              Back to Posts
            </Button>
          )}

          <div className="post-add-header">
            <FormOutlined 
              className="post-add-icon" 
              style={{ color: token.colorPrimary }} 
            />
            <div>
              <Title level={2} className="post-add-title">
                Create New Post
              </Title>
              <Text className="post-add-subtitle">
                Share your thoughts with the world
              </Text>
            </div>
          </div>

          <Card className="post-add-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              className="post-add-form"
            >
              <Form.Item
                name="userId"
                label="Author"
                rules={[{ required: true, message: 'Please select a user' }]}
              >
                <Select
                  placeholder="Select a user"
                  size="large"
                  loading={usersLoading}
                  suffixIcon={<UserOutlined className="input-icon" />}
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>

              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input 
                  placeholder="Enter post title" 
                  size="large"
                  maxLength={200}
                  showCount
                />
              </Form.Item>

              <Form.Item
                name="body"
                label="Content"
                rules={[{ required: true, message: 'Please enter post content' }]}
              >
                <TextArea 
                  placeholder="Write your post content here..."
                  rows={6}
                  maxLength={1000}
                  showCount
                  className="post-textarea"
                />
              </Form.Item>

              <Form.Item className="submit-section">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block
                  loading={loading}
                  className="submit-button"
                >
                  {loading ? 'Creating Post...' : 'Create Post'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default PostAdd

