import { List, Card, Typography, Layout, theme } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import './Dashboard.css'

const { Title } = Typography
const { Content } = Layout

interface Post {
  id: number
  title: string
}

const posts: Post[] = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
  { id: 4, title: 'Item 4' },
  { id: 5, title: 'Item 5' },
]

function Dashboard() {
  const { token } = theme.useToken()

  return (
    <Layout className="dashboard-layout">
      <Content className="dashboard-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <FileTextOutlined 
              className="dashboard-icon" 
              style={{ color: token.colorPrimary }} 
            />
            <Title level={2} className="dashboard-title">
              Posts
            </Title>
          </div>

          <Card className="posts-card">
            <List
              dataSource={posts}
              renderItem={(post) => (
                <List.Item className="post-item">
                  <List.Item.Meta
                    avatar={
                      <div className="post-avatar">
                        {post.id}
                      </div>
                    }
                    title={<span className="post-title">{post.title}</span>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default Dashboard

