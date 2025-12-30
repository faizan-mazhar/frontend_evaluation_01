import React, { useEffect, useState } from 'react'
import { Layout, Card, Typography, Row, Col, Button, Divider, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../../../api'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

interface PostDetailProps {
    post?: any
    onBack?: () => void
}

const PostDetail: React.FC<PostDetailProps> = ({ post: propPost, onBack }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState(propPost || {})

    useEffect(() => {
        if (!propPost && id) {
            getPostById(id).then((data: any) => setPost(data))
        }
    }, [id, propPost])

    const bodyLines = post?.body ? post.body.split('\n') : []

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Content style={{ padding: '4rem 2rem' }}>
                <Row justify="center">
                    <Col xs={24} sm={22} md={20} lg={16}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                style={{
                                    background: '#fff',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    padding: '2rem',
                                }}
                            >
                                <Button
                                    type="link"
                                    icon={<ArrowLeftOutlined />}
                                    onClick={onBack ? onBack : () => navigate(-1)}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    Back to Posts
                                </Button>


                                <Divider />

                                <Title level={2} style={{ marginBottom: '0.5rem' }}>
                                    {post?.title || 'Post Title'}
                                </Title>

                                <Space size="middle" style={{ marginBottom: '1rem' }}>
                                    <Text type="secondary">Post #{post?.id || '-'}</Text>
                                    <Text type="secondary">User {post?.userId || '-'}</Text>
                                </Space>

                                <Divider />

                                <Text strong>Content</Text>
                                <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                                    {bodyLines.map((line, idx) => (
                                        <span key={idx}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </Paragraph>

                                <Divider />

                                <Row justify="space-between">
                                    <Col>
                                        <Space size="large">
                                            <div>
                                                <Text>Post ID</Text>
                                                <div className="stat-value">{post?.id || '-'}</div>
                                            </div>
                                            <div>
                                                <Text>Author ID</Text>
                                                <div className="stat-value">{post?.userId || '-'}</div>
                                            </div>
                                        </Space>
                                    </Col>
                                    <Col>
                                        <Space>
                                            <Button type="primary">Edit Post</Button>
                                            <Button danger>Delete Post</Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Card>
                        </motion.div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default PostDetail
