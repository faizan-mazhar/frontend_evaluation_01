import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('placehodler', () => {
    render(<App />)
    const body = screen.getByRole('body')
    expect(body).toHaveStyle({ backgroundColor: 'white' })
  })

  // it('renders the Dashboard screen by default', () => {
  //   render(<App />)
  //   expect(screen.getByText('Posts')).toBeInTheDocument()
  // })

  // it('renders all 5 post items', () => {
  //   render(<App />)
  //   expect(screen.getByText('Item 1')).toBeInTheDocument()
  //   expect(screen.getByText('Item 2')).toBeInTheDocument()
  //   expect(screen.getByText('Item 3')).toBeInTheDocument()
  //   expect(screen.getByText('Item 4')).toBeInTheDocument()
  //   expect(screen.getByText('Item 5')).toBeInTheDocument()
  // })
})
