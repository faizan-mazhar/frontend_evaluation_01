import  { useEffect, useState } from "react";
import { getAllUsers, postApi } from "../../../apis";
import './PostAdd.css'
const PostAdd = () => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const payload = {
      title,
      body,
      userId: Number(userId),
    };

    const res = await postApi(payload);
    console.log("Post Created>>>>", res);
    alert("Post created successfully!");
    setTitle("");
    setBody("");
    setUserId("");
  };

  return (
    <div className="container">
      <h2 className="heading">Add New Post</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Title</label>
        <input
          className="input"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="label">Body</label>
        <textarea
          className="textarea"
          placeholder="Enter post content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <label className="label">Select User</label>
        <select
          className="select"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" className="button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default PostAdd;
