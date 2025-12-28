import Dashboard from './screens/Dashboard'
import Registration from './screens/Registration'
import PostList from './screens/Post/PostList'
import PostAdd from './screens/Post/PostAdd'
import PostDetails from './screens/Post/PostDetails';
function App() {
  const post = {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  // return <Dashboard />
  return <PostDetails post={post} />
}

export default App

