import { Form, Input, Button, Card, Typography, Row, Col, Divider, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './Registration.css'

const { Title, Text } = Typography
const API_URL = 'https://jsonplaceholder.typicode.com/users'

export interface RegistrationFormData {
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string; lng: string }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

function Registration() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const validateEmail = (_: unknown, value: string) => {
    if (!value) return Promise.resolve()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return Promise.reject(new Error('Please enter a valid email'))
    return Promise.resolve()
  }

  const validateLatitude = (_: unknown, value: string) => {
    if (!value) return Promise.resolve()
    const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/
    if (!latRegex.test(value)) return Promise.reject(new Error('Please enter a valid latitude'))
    return Promise.resolve()
  }

  const validateLongitude = (_: unknown, value: string) => {
    if (!value) return Promise.resolve()
    const lngRegex = /^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/
    if (!lngRegex.test(value)) return Promise.reject(new Error('Please enter a valid longitude'))
    return Promise.resolve()
  }

  const handleSubmit = async (values: RegistrationFormData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error('Failed to create user')
      await response.json()
      message.success('Account created successfully!')
      form.resetFields()
    } catch (err) {
      message.error('Failed to create account')
    }
  }

  return (
    <div className="registration-layout">
      <div className="registration-container">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/posts')} className="back-button">
          Back to Posts
        </Button>

        <Card className="registration-card">
          <div className="registration-header">
            <Title level={2} className="registration-title">Create Account</Title>
            <Text className="registration-subtitle">Join us and start your journey</Text>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Divider orientation="left">Personal Information</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your full name' }]}>
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter a username' }]}>
                  <Input placeholder="Enter username" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }, { validator: validateEmail }]}>
                  <Input type="email" placeholder="Enter your email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                  <Input placeholder="Enter phone number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="website" label="Website" rules={[{ required: true, message: 'Please enter your website' }]}>
              <Input placeholder="Enter website URL" />
            </Form.Item>

            <Divider orientation="left">Address</Divider>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'street']} label="Street" rules={[{ required: true, message: 'Please enter street address' }]}>
                  <Input placeholder="Enter street address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'suite']} label="Suite/Apt" rules={[{ required: true, message: 'Please enter suite/apt' }]}>
                  <Input placeholder="Enter suite/apt" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'city']} label="City" rules={[{ required: true, message: 'Please enter city' }]}>
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'zipcode']} label="Zipcode" rules={[{ required: true, message: 'Please enter zipcode' }]}>
                  <Input placeholder="Enter zipcode" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'geo', 'lat']} label="Latitude" rules={[{ required: true, message: 'Please enter latitude' }, { validator: validateLatitude }]}>
                  <Input placeholder="Enter latitude" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name={['address', 'geo', 'lng']} label="Longitude" rules={[{ required: true, message: 'Please enter longitude' }, { validator: validateLongitude }]}>
                  <Input placeholder="Enter longitude" />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Company</Divider>
            <Form.Item name={['company', 'name']} label="Company Name" rules={[{ required: true, message: 'Please enter company name' }]}>
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item name={['company', 'catchPhrase']} label="Catch Phrase" rules={[{ required: true, message: 'Please enter catch phrase' }]}>
              <Input placeholder="Enter catch phrase" />
            </Form.Item>
            <Form.Item name={['company', 'bs']} label="Business" rules={[{ required: true, message: 'Please enter business description' }]}>
              <Input placeholder="Enter business description" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>Create Account</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Registration
