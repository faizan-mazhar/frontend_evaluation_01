import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PostDetails from './PostDetails'
import type { Post } from '../types'

const mockPost: Post = {
  userId: 1,
  id: 42,
  title: 'Test Post Title',
  body: 'This is the post body content.',
}

const mockPostWithMultilineBody: Post = {
  userId: 2,
  id: 99,
  title: 'Multiline Post',
  body: 'First line\nSecond line\nThird line',
}

describe('PostDetails', () => {
  it('renders the post title', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByRole('heading', { name: 'Test Post Title' })).toBeInTheDocument()
  })

  it('renders the post body content', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('This is the post body content.')).toBeInTheDocument()
  })

  it('displays post ID in the tag', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('Post #42')).toBeInTheDocument()
  })

  it('displays user ID in the tag', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('User 1')).toBeInTheDocument()
  })

  it('displays Post ID label in footer', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('Post ID')).toBeInTheDocument()
  })

  it('displays Author ID label in footer', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('Author ID')).toBeInTheDocument()
  })

  it('displays post ID value in footer', () => {
    render(<PostDetails post={mockPost} />)
    
    const statValues = document.querySelectorAll('.stat-value')
    expect(statValues[0]).toHaveTextContent('42')
  })

  it('displays author ID value in footer', () => {
    render(<PostDetails post={mockPost} />)
    
    const statValues = document.querySelectorAll('.stat-value')
    expect(statValues[1]).toHaveTextContent('1')
  })

  it('displays Content label', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Back button when onBack is provided', () => {
    const onBack = vi.fn()
    render(<PostDetails post={mockPost} onBack={onBack} />)
    
    expect(screen.getByRole('button', { name: /back to posts/i })).toBeInTheDocument()
  })

  it('does not render Back button when onBack is not provided', () => {
    render(<PostDetails post={mockPost} />)
    
    expect(screen.queryByRole('button', { name: /back to posts/i })).not.toBeInTheDocument()
  })

  it('calls onBack when Back button is clicked', () => {
    const onBack = vi.fn()
    render(<PostDetails post={mockPost} onBack={onBack} />)
    
    const backButton = screen.getByRole('button', { name: /back to posts/i })
    fireEvent.click(backButton)
    
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('renders multiline body content correctly', () => {
    render(<PostDetails post={mockPostWithMultilineBody} />)
    
    expect(screen.getByText('First line')).toBeInTheDocument()
    expect(screen.getByText('Second line')).toBeInTheDocument()
    expect(screen.getByText('Third line')).toBeInTheDocument()
  })

  it('renders with different post data', () => {
    const anotherPost: Post = {
      userId: 5,
      id: 123,
      title: 'Another Post Title',
      body: 'Different body content here.',
    }
    
    render(<PostDetails post={anotherPost} />)
    
    expect(screen.getByRole('heading', { name: 'Another Post Title' })).toBeInTheDocument()
    expect(screen.getByText('Different body content here.')).toBeInTheDocument()
    expect(screen.getByText('Post #123')).toBeInTheDocument()
    expect(screen.getByText('User 5')).toBeInTheDocument()
  })
})

