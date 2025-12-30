import React, { useEffect, useState } from 'react'
import {
    Layout,
    List,
    Card,
    Typography,
    Spin,
    Row,
    Col,
    Button,
    Space,
} from 'antd'
import { FileTextOutlined, UserAddOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getPost } from '../../api'
import PostAddModal from '../Post/PostAdd/PostAdd'

const { Title, Paragraph } = Typography
const { Content } = Layout

const PostList = () => {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getPost().then((data: any[]) => {
            setPosts(data)
            setLoading(false)
        })
    }, [])

    const openModal = () => setIsModalVisible(true)
    const closeModal = () => setIsModalVisible(false)

    const handlePostSave = (payload: any) => {
        setPosts(prev => [{ ...payload, id: Date.now() }, ...prev])
        closeModal()
    }

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
                <Content
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Spin size="large" />
                </Content>
            </Layout>
        )
    }

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Content style={{ padding: '2rem' }}>
                <Row justify="space-between" align="middle" style={{ marginBottom: '2rem' }}>
                    <Col>
                        <Title level={2}>Posts</Title>
                    </Col>

                    <Col>
                        {/* ✅ Top Right Buttons */}
                        <Space>
                            <Button
                                icon={<UserAddOutlined />}
                                onClick={() => navigate('/registration')}
                            >
                                Registration
                            </Button>

                            <Button type="primary" onClick={openModal}>
                                Add New Post
                            </Button>
                        </Space>
                    </Col>
                </Row>

                <List
                    grid={{ gutter: 16, xs: 1, md: 2, lg: 3 }}
                    dataSource={posts}
                    renderItem={(post: any) => (
                        <List.Item key={post.id}>
                            <Card
                                hoverable
                                title={post.title}
                                style={{
                                    borderRadius: 10,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                }}
                                onClick={() => navigate(`/posts/${post.id}`)}
                            >
                                <Paragraph ellipsis={{ rows: 3 }}>
                                    {post.body}
                                </Paragraph>

                                <Button
                                    type="link"
                                    icon={<FileTextOutlined />}
                                    onClick={() => navigate(`/posts/${post.id}`)}
                                >
                                    View Details
                                </Button>
                            </Card>
                        </List.Item>
                    )}
                />

                <PostAddModal
                    modalProps={{
                        open: isModalVisible,
                        onCancel: closeModal,
                    }}
                    onSave={handlePostSave}
                />
            </Content>
        </Layout>
    )
}

export default PostList
