import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Typography } from 'antd'

const { Title, Text } = Typography
const { TextArea } = Input
const USERS_API = 'https://jsonplaceholder.typicode.com/users'
const POSTS_API = 'https://jsonplaceholder.typicode.com/posts'

function PostAdd() {
  const [form] = Form.useForm()
  const [users, setUsers] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(USERS_API)
      .then(res => res.json())
      .then(setUsers)
  }, [])

  const handleSubmit = async (values: any) => {
    setLoading(true)
    await fetch(POSTS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    form.resetFields()
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 400, margin: '20px auto' }}>
      <Link to="/posts"><Button>Back to Posts</Button></Link>

      <Title level={2} style={{ marginTop: 20 }}>Create New Post</Title>
      <Text>Share your thoughts with the world</Text>

      <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 20 }}>
        <Form.Item label="Author" name="userId" rules={[{ required: true, message: 'Please select a user' }]}>
          <Select placeholder="Select a user">
            {users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item label="Content" name="body" rules={[{ required: true, message: 'Please enter post content' }]}>
          <TextArea rows={4} placeholder="Write your post content here..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PostAdd
