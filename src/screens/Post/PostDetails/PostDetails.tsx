import { Card, Typography, Layout, Button, Tag, theme, Divider } from 'antd'
import { ArrowLeftOutlined, UserOutlined, NumberOutlined } from '@ant-design/icons'
import type { Post } from '../types'
import './PostDetails.css'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

interface PostDetailsProps {
  post: Post
  onBack?: () => void
}

function PostDetails({ post, onBack }: PostDetailsProps) {
  const { token } = theme.useToken()

  return (
    <Layout className="post-details-layout">
      <Content className="post-details-content">
        <div className="post-details-container">
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

          <Card className="post-details-card">
            <div className="post-meta">
              <Tag 
                icon={<NumberOutlined />} 
                color="blue"
                className="post-tag"
              >
                Post #{post.id}
              </Tag>
              <Tag 
                icon={<UserOutlined />} 
                color="geekblue"
                className="post-tag"
              >
                User {post.userId}
              </Tag>
            </div>

            <Title level={2} className="post-detail-title">
              {post.title}
            </Title>

            <Divider className="post-divider" />

            <div className="post-body-section">
              <Text type="secondary" className="body-label">Content</Text>
              <Paragraph className="post-body-text">
                {post.body.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < post.body.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </Paragraph>
            </div>

            <Divider className="post-divider" />

            <div className="post-footer">
              <div className="footer-stat">
                <div 
                  className="stat-icon" 
                  style={{ background: token.colorPrimary }}
                >
                  <NumberOutlined />
                </div>
                <div className="stat-content">
                  <Text type="secondary" className="stat-label">Post ID</Text>
                  <Text strong className="stat-value">{post.id}</Text>
                </div>
              </div>
              <div className="footer-stat">
                <div 
                  className="stat-icon"
                  style={{ background: '#722ed1' }}
                >
                  <UserOutlined />
                </div>
                <div className="stat-content">
                  <Text type="secondary" className="stat-label">Author ID</Text>
                  <Text strong className="stat-value">{post.userId}</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default PostDetails

