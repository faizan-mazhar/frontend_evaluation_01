export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export type PostFormData = Omit<Post, 'id'>

