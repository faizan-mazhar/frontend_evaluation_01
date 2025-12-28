import { useState, useEffect } from 'react'
import { List, Card, Typography, Layout, theme, Spin, Empty, Button } from 'antd'
import { FileTextOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import type { Post } from '../types'
import './PostList.css'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

interface PostListProps {
  onViewPost?: (post: Post) => void
  onAddPost?: () => void
}

function PostList({ onViewPost, onAddPost }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { token } = theme.useToken()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="post-list-layout">
      <Content className="post-list-content">
        <div className="post-list-container">
          <div className="post-list-header">
            <div className="header-left">
              <FileTextOutlined 
                className="post-list-icon" 
                style={{ color: token.colorPrimary }} 
              />
              <div>
                <Title level={2} className="post-list-title">
                  Posts
                </Title>
                <Text className="post-list-subtitle">
                  Browse all posts
                </Text>
              </div>
            </div>
            {onAddPost && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={onAddPost}
                className="add-post-button"
              >
                New Post
              </Button>
            )}
          </div>

          <Card className="posts-card">
            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : error ? (
              <Empty 
                description={error}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <List
                dataSource={posts}
                renderItem={(post) => (
                  <List.Item 
                    className="post-item"
                    actions={onViewPost ? [
                      <Button 
                        key="view"
                        type="text" 
                        icon={<EyeOutlined />}
                        onClick={() => onViewPost(post)}
                      >
                        View
                      </Button>
                    ] : undefined}
                  >
                    <List.Item.Meta
                      avatar={
                        <div className="post-avatar">
                          {post.id}
                        </div>
                      }
                      title={
                        <span 
                          className="post-title-text"
                          onClick={() => onViewPost?.(post)}
                        >
                          {post.title}
                        </span>
                      }
                      description={
                        <Paragraph 
                          ellipsis={{ rows: 2 }} 
                          className="post-body-preview"
                        >
                          {post.body}
                        </Paragraph>
                      }
                    />
                  </List.Item>
                )}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: false,
                  showTotal: (total) => `${total} posts`,
                }}
              />
            )}
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default PostList

