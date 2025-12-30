
import Dashboard from "./screens/Dashboard"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetails from "./screens/Post/PostDetails";
import PostAdd from "./screens/Post/PostAdd";
import Registration from "./screens/Registration";
import { PostList } from "./screens/Post";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/postlisting" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/add" element={<PostAdd />} />
        <Route path="/registration" element={<Registration />} />

      </Routes>
    </BrowserRouter> 
  )
}

export default App

