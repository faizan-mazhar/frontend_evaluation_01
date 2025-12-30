import axios from "axios"
import { API_URL } from "../config/env"

export const getPost = async () => {
    try {
        const response = await axios.get(`${API_URL}`)
        const data = response.data
        console.log('data', data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const addPost = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/`, data)
        const responseData = response.data
        console.log('data', responseData)
        return responseData
    } catch (error) {
        console.log(error)
    }
}

export const addUser = async (data: any) => {
    try {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/users`, data)
        const responseData = response.data
        console.log('data', responseData)
        return responseData
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        const data = response.data
        console.log('data', data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        const data = response.data
        console.log('data', data)
        return data
    } catch (error) {
        console.log(error)
    }
}