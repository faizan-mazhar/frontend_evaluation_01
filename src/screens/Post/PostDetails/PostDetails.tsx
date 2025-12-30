import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../../apis';

function PostDetails() {
  const { id } = useParams();      
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data); 
      } catch (error) {
        console.error('Error fetching post:', error);
      } 
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>Post Details</h1>
      <p><strong>ID:</strong> {post.id}</p>
      <p><strong>User ID:</strong> {post.userId}</p>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetails;
