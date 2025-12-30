import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../../../apis";
import CommonTable from "../../../common";
import { columns } from "./columns";
function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        console.log("Posts data:", data.data);
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Post listing</h1>
      <CommonTable columns={columns(navigate)} data={posts} />
    </div>
  );
}

export default PostList;
