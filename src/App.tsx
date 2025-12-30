import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./screens/Post/PostList/PostList";
import PostAdd from "./screens/Post/PostAdd/PostAdd";
import PostDetails from "./screens/Post/PostDetails/postDetails";
import Registration from "./screens/Registration/Registration";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20, textAlign: "center" }}>
          <Link to="/posts" style={{ margin: "0 10px" }}>Posts</Link>
          <Link to="/add-post" style={{ margin: "0 10px" }}>Add Post</Link>
          <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/add-post" element={<PostAdd />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
