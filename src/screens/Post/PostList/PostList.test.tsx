import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import PostList from './PostList'

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: 'First Post Title',
    body: 'First post body content',
  },
  {
    userId: 1,
    id: 2,
    title: 'Second Post Title',
    body: 'Second post body content',
  },
  {
    userId: 2,
    id: 3,
    title: 'Third Post Title',
    body: 'Third post body content',
  },
]

describe('PostList', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders the title and subtitle', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    render(<PostList />)
    
    expect(screen.getByRole('heading', { name: 'Posts' })).toBeInTheDocument()
    expect(screen.getByText('Browse all posts')).toBeInTheDocument()
  })

  it('shows loading spinner initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading state
    )

    render(<PostList />)
    
    // Ant Design Spin component uses aria-busy attribute
    expect(document.querySelector('.ant-spin-spinning')).toBeInTheDocument()
  })

  it('displays posts after successful fetch', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument()
    })

    expect(screen.getByText('Second Post Title')).toBeInTheDocument()
    expect(screen.getByText('Third Post Title')).toBeInTheDocument()
  })

  it('displays post body previews', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByText('First post body content')).toBeInTheDocument()
    })
  })

  it('displays error message when fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response)

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch posts')).toBeInTheDocument()
    })
  })

  it('displays error message when network error occurs', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    render(<PostList />)

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('renders New Post button when onAddPost is provided', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const onAddPost = vi.fn()
    render(<PostList onAddPost={onAddPost} />)

    expect(screen.getByRole('button', { name: /new post/i })).toBeInTheDocument()
  })

  it('does not render New Post button when onAddPost is not provided', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    render(<PostList />)

    expect(screen.queryByRole('button', { name: /new post/i })).not.toBeInTheDocument()
  })

  it('calls onAddPost when New Post button is clicked', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const onAddPost = vi.fn()
    render(<PostList onAddPost={onAddPost} />)

    const newPostButton = screen.getByRole('button', { name: /new post/i })
    fireEvent.click(newPostButton)

    expect(onAddPost).toHaveBeenCalledTimes(1)
  })

  it('renders View buttons when onViewPost is provided', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const onViewPost = vi.fn()
    render(<PostList onViewPost={onViewPost} />)

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /view/i })).toHaveLength(3)
    })
  })

  it('calls onViewPost with correct post when View button is clicked', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const onViewPost = vi.fn()
    render(<PostList onViewPost={onViewPost} />)

    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument()
    })

    const viewButtons = screen.getAllByRole('button', { name: /view/i })
    fireEvent.click(viewButtons[0])

    expect(onViewPost).toHaveBeenCalledTimes(1)
    expect(onViewPost).toHaveBeenCalledWith(mockPosts[0])
  })

  it('calls onViewPost when post title is clicked', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    const onViewPost = vi.fn()
    render(<PostList onViewPost={onViewPost} />)

    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('First Post Title'))

    expect(onViewPost).toHaveBeenCalledTimes(1)
    expect(onViewPost).toHaveBeenCalledWith(mockPosts[0])
  })

  it('displays post IDs in avatars', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response)

    render(<PostList />)

    await waitFor(() => {
      const avatars = document.querySelectorAll('.post-avatar')
      expect(avatars).toHaveLength(3)
      expect(avatars[0]).toHaveTextContent('1')
      expect(avatars[1]).toHaveTextContent('2')
      expect(avatars[2]).toHaveTextContent('3')
    })
  })
})

