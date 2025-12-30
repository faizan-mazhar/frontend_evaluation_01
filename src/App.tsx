import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PostList from './screens/Post/PostList'
import PostAdd from './screens/Post/PostAdd'
import PostDetails from './screens/Post/PostDetails'
import Registration from './screens/Registration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/add" element={<PostAdd />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

