import React from 'react'
import {
    Layout,
    Card,
    Typography,
    Row,
    Col,
    Form,
    Input,
    Button,
    Divider
} from 'antd'
import { addUser } from '../../api'

const { Title, Text } = Typography
const { Content } = Layout

const Registration = () => {
    const [form] = Form.useForm()

    const handleSubmit = async () => {
        const values = await form.validateFields()

        const payload = {
            name: values.name,
            username: values.username,
            email: values.email,
            phone: values.phone,
            website: values.website,
            address: {
                street: values.street,
                suite: values.suite,
                city: values.city,
                zipcode: values.zipcode,
                geo: {
                    lat: values.lat,
                    lng: values.lng
                }
            },
            company: {
                name: values.companyName,
                catchPhrase: values.catchPhrase,
                bs: values.bs
            }
        }

        await addUser(payload)
        form.resetFields()
    }

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Content style={{ padding: '2rem' }}>
                <Row justify="center">
                    <Col xs={24} sm={22} md={20} lg={16}>
                        <Card>
                            <Title level={2}>Create Account</Title>
                            <Text>Join us and start your journey</Text>

                            <Form layout="vertical" form={form} style={{ marginTop: 24 }}>
                                <Title level={4}>Personal Information</Title>

                                <Form.Item
                                    label="Full Name"
                                    name="name"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Website" name="website">
                                    <Input />
                                </Form.Item>

                                <Divider />

                                <Title level={4}>Address</Title>

                                <Form.Item
                                    label="Street"
                                    name="street"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Suite/Apt"
                                    name="suite"
                                    rules={[{ required: true, message: 'Please enter suite/apt' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[{ required: true, message: 'Please enter city' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Zipcode" name="zipcode">
                                    <Input />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Latitude"
                                            name="lat"
                                            rules={[
                                                {
                                                    pattern: /^-?\d+(\.\d+)?$/,
                                                    message: 'Please enter a valid latitude'
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="Longitude"
                                            name="lng"
                                            rules={[
                                                {
                                                    pattern: /^-?\d+(\.\d+)?$/,
                                                    message: 'Please enter a valid longitude'
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Divider />

                                {/* Company */}
                                <Title level={4}>Company</Title>

                                <Form.Item label="Company Name" name="companyName">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Catch Phrase" name="catchPhrase">
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Business" name="bs">
                                    <Input />
                                </Form.Item>

                                <Divider />

                                <Button type="primary" block onClick={handleSubmit}>
                                    Create Account
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Registration