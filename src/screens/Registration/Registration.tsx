import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Typography } from 'antd'

const { Title, Text } = Typography
const { Password } = Input

function Registration() {
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    console.log('Form Values:', values)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    

    <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <Link to="/posts"><Button>Back to Posts</Button></Link>
      <Title level={2}>Create Account</Title>
      <Text>Join us and start your journey</Text>
      <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter password' }]}
        >
          <Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('Passwords do not match')
              }
            })
          ]}
        >
          <Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Registration
