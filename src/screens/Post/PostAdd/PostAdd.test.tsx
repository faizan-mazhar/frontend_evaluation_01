import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostAdd from './PostAdd'

const mockUsers = [
  { id: 1, name: 'Leanne Graham' },
  { id: 2, name: 'Ervin Howell' },
  { id: 3, name: 'Clementine Bauch' },
]

describe('PostAdd', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // Default mock for users API
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    } as Response)
  })

  it('renders the title and subtitle', async () => {
    render(<PostAdd />)
    
    expect(screen.getByRole('heading', { name: 'Create New Post' })).toBeInTheDocument()
    expect(screen.getByText('Share your thoughts with the world')).toBeInTheDocument()
  })

  it('renders all form fields', async () => {
    render(<PostAdd />)

    await waitFor(() => {
      expect(screen.getByLabelText('Author')).toBeInTheDocument()
    })
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Content')).toBeInTheDocument()
  })

  it('renders submit button', async () => {
    render(<PostAdd />)
    
    expect(screen.getByRole('button', { name: 'Create Post' })).toBeInTheDocument()
  })

  it('fetches users on mount', async () => {
    render(<PostAdd />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
    })
  })

  it('renders Back button when onBack is provided', async () => {
    const onBack = vi.fn()
    render(<PostAdd onBack={onBack} />)

    expect(screen.getByRole('button', { name: /back to posts/i })).toBeInTheDocument()
  })

  it('does not render Back button when onBack is not provided', async () => {
    render(<PostAdd />)

    expect(screen.queryByRole('button', { name: /back to posts/i })).not.toBeInTheDocument()
  })

  it('calls onBack when Back button is clicked', async () => {
    const onBack = vi.fn()
    render(<PostAdd onBack={onBack} />)

    const backButton = screen.getByRole('button', { name: /back to posts/i })
    fireEvent.click(backButton)

    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<PostAdd />)

    const submitButton = screen.getByRole('button', { name: 'Create Post' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please select a user')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Please enter a title')).toBeInTheDocument()
    expect(screen.getByText('Please enter post content')).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    
    // Mock both users fetch and post creation
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 101, userId: 1, title: 'Test Title', body: 'Test Body' }),
      } as Response)

    render(<PostAdd onSuccess={onSuccess} />)

    // Wait for users to load
    await waitFor(() => {
      expect(screen.getByText('Select a user')).toBeInTheDocument()
    })

    // Open the select dropdown and select a user
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)
    
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Leanne Graham'))

    // Fill in title
    const titleInput = screen.getByLabelText('Title')
    await user.type(titleInput, 'Test Post Title')

    // Fill in content
    const contentInput = screen.getByLabelText('Content')
    await user.type(contentInput, 'Test post body content')

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Create Post' })
    await user.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })
  })

  it('calls onSuccess after successful submission', async () => {
    const user = userEvent.setup()
    const onSuccess = vi.fn()
    
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 101 }),
      } as Response)

    render(<PostAdd onSuccess={onSuccess} />)

    await waitFor(() => {
      expect(screen.getByText('Select a user')).toBeInTheDocument()
    })

    // Select user
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)
    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())
    await user.click(screen.getByText('Leanne Graham'))

    // Fill form
    await user.type(screen.getByLabelText('Title'), 'Test Title')
    await user.type(screen.getByLabelText('Content'), 'Test Content')

    // Submit
    await user.click(screen.getByRole('button', { name: 'Create Post' }))

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1)
    })
  })

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)
      .mockImplementationOnce(() => new Promise(() => {})) // Never resolves

    render(<PostAdd />)

    await waitFor(() => {
      expect(screen.getByText('Select a user')).toBeInTheDocument()
    })

    // Select user and fill form
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)
    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())
    await user.click(screen.getByText('Leanne Graham'))
    await user.type(screen.getByLabelText('Title'), 'Test')
    await user.type(screen.getByLabelText('Content'), 'Test')

    // Submit
    await user.click(screen.getByRole('button', { name: 'Create Post' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /creating post/i })).toBeInTheDocument()
    })
  })

  it('displays users in the select dropdown', async () => {
    const user = userEvent.setup()
    render(<PostAdd />)

    await waitFor(() => {
      expect(screen.getByText('Select a user')).toBeInTheDocument()
    })

    // Open dropdown
    const selectTrigger = screen.getByRole('combobox')
    await user.click(selectTrigger)

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
      expect(screen.getByText('Ervin Howell')).toBeInTheDocument()
      expect(screen.getByText('Clementine Bauch')).toBeInTheDocument()
    })
  })

  it('has title input with placeholder', async () => {
    render(<PostAdd />)

    const titleInput = screen.getByPlaceholderText('Enter post title')
    expect(titleInput).toBeInTheDocument()
  })

  it('has content textarea with placeholder', async () => {
    render(<PostAdd />)

    const contentInput = screen.getByPlaceholderText('Write your post content here...')
    expect(contentInput).toBeInTheDocument()
  })
})

