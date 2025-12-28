import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Layout, Row, Col, Divider, theme, message } from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined,
  HomeOutlined,
  BankOutlined,
  IdcardOutlined
} from '@ant-design/icons'
import './Registration.css'

const { Title, Text } = Typography
const { Content } = Layout

export interface RegistrationFormData {
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const API_URL = 'https://jsonplaceholder.typicode.com/users'

function Registration() {
  const [form] = Form.useForm<RegistrationFormData>()
  const [loading, setLoading] = useState(false)
  const { token } = theme.useToken()

  const onFinish = async (values: RegistrationFormData) => {
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
        throw new Error('Registration failed')
      }

      const data = await response.json()
      console.log('Registration successful:', data)
      message.success('Account created successfully!')
      form.resetFields()
    } catch (error) {
      console.error('Registration error:', error)
      message.error('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="registration-layout">
      <Content className="registration-content">
        <div className="registration-container">
          <div className="registration-header">
            <IdcardOutlined 
              className="registration-icon" 
              style={{ color: token.colorPrimary }} 
            />
            <div>
              <Title level={2} className="registration-title">
                Create Account
              </Title>
              <Text className="registration-subtitle">
                Join us and start your journey
              </Text>
            </div>
          </div>

          <Card className="registration-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              className="registration-form"
            >
              {/* Personal Information */}
              <div className="form-section">
                <div className="section-header">
                  <UserOutlined className="section-icon" />
                  <Text strong className="section-title">Personal Information</Text>
                </div>
                
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="input-icon" />} 
                        placeholder="Leanne Graham" 
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ required: true, message: 'Please choose a username' }]}
                    >
                      <Input 
                        prefix={<span className="input-icon">@</span>} 
                        placeholder="bret" 
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined className="input-icon" />} 
                        placeholder="sincere@april.biz" 
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true, message: 'Please enter your phone' }]}
                    >
                      <Input 
                        prefix={<PhoneOutlined className="input-icon" />} 
                        placeholder="1-770-736-8031" 
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="website"
                  label="Website"
                >
                  <Input 
                    prefix={<GlobalOutlined className="input-icon" />} 
                    placeholder="hildegard.org" 
                    size="large"
                  />
                </Form.Item>
              </div>

              <Divider className="form-divider" />

              {/* Address */}
              <div className="form-section">
                <div className="section-header">
                  <HomeOutlined className="section-icon" />
                  <Text strong className="section-title">Address</Text>
                </div>

                <Row gutter={16}>
                  <Col xs={24} sm={16}>
                    <Form.Item
                      name={['address', 'street']}
                      label="Street"
                      rules={[{ required: true, message: 'Please enter street' }]}
                    >
                      <Input placeholder="Kulas Light" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name={['address', 'suite']}
                      label="Suite/Apt"
                      rules={[{ required: true, message: 'Please enter suite/apt' }]}
                    >
                      <Input placeholder="Apt. 556" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={['address', 'city']}
                      label="City"
                      rules={[{ required: true, message: 'Please enter city' }]}
                    >
                      <Input placeholder="Gwenborough" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={['address', 'zipcode']}
                      label="Zipcode"
                      rules={[{ required: true, message: 'Please enter zipcode' }]}
                    >
                      <Input placeholder="92998-3874" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={['address', 'geo', 'lat']}
                      label="Latitude"
                      rules={[{ type: 'number', message: 'Please enter a valid latitude' }]}
                    >
                      <Input placeholder="-37.3159" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={['address', 'geo', 'lng']}
                      label="Longitude"
                      rules={[{ type: 'number', message: 'Please enter a valid longitude' }]}
                    >
                      <Input placeholder="81.1496" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Divider className="form-divider" />

              {/* Company */}
              <div className="form-section">
                <div className="section-header">
                  <BankOutlined className="section-icon" />
                  <Text strong className="section-title">Company</Text>
                </div>

                <Form.Item
                  name={['company', 'name']}
                  label="Company Name"
                >
                  <Input placeholder="Romaguera-Crona" size="large" />
                </Form.Item>

                <Form.Item
                  name={['company', 'catchPhrase']}
                  label="Catch Phrase"
                >
                  <Input placeholder="Multi-layered client-server neural-net" size="large" />
                </Form.Item>

                <Form.Item
                  name={['company', 'bs']}
                  label="Business"
                >
                  <Input placeholder="harness real-time e-markets" size="large" />
                </Form.Item>
              </div>

              <Form.Item className="submit-section">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  block
                  loading={loading}
                  className="submit-button"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default Registration

