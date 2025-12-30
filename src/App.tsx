
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './screens/Dashboard/Dashboard'
import PostDetail from './screens/Post/PostDetails/postDetail'
import { Registration } from './screens/Registration'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App
