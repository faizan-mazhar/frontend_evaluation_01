// all apis 
import axios from 'axios';
export const API_URL = "https://jsonplaceholder.typicode.com"


export const postApi = async (data:any) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}


export const getPostById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${id}`);
        console.log(`Fetched post with id ${id}:`, response);
        return response;
    } catch (error) {
        console.log(`Error fetching post with id ${id}:`, error);
        throw error;
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log('Fetched posts:', response);
        return response;
    } catch (error) {
        console.log(`Error fetching posts:`, error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        console.log('Fetched users:', response);
        return response;
    } catch (error) {
        console.log(`Error fetching users:`, error);
        throw error;
    }
}
export const registerUser = async (data:any) => {
    try {
        const response = await axios.post(`${API_URL}/users`, data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}