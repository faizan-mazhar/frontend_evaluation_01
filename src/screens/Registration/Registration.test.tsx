import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Registration } from './Registration'

describe('Registration', () => {
  it('renders the registration title', () => {
    render(<Registration />)
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Registration />)
    expect(screen.getByText('Join us and start your journey')).toBeInTheDocument()
  })

  it('renders all form sections', () => {
    render(<Registration />)
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
  })

  it('renders personal information fields', () => {
    render(<Registration />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Website')).toBeInTheDocument()
  })

  it('renders address fields', () => {
    render(<Registration />)
    expect(screen.getByLabelText('Street')).toBeInTheDocument()
    expect(screen.getByLabelText('Suite/Apt')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Zipcode')).toBeInTheDocument()
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument()
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument()
  })

  it('renders company fields', () => {
    render(<Registration />)
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Catch Phrase')).toBeInTheDocument()
    expect(screen.getByLabelText('Business')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Registration />)
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
  })

  it('should raise email validation error when email is invalid', async () => {
    render(<Registration />)
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('should raise latitude validation error when latitude is invalid', async () => {
    render(<Registration />)
    const latitudeInput = screen.getByLabelText('Latitude')
    fireEvent.change(latitudeInput, { target: { value: 'invalid-latitude' } })
    fireEvent.blur(latitudeInput)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid latitude')).toBeInTheDocument()
    })
  })

  it('should raise longitude validation error when longitude is invalid', async () => {
    render(<Registration />)
    const longitudeInput = screen.getByLabelText('Longitude')
    fireEvent.change(longitudeInput, { target: { value: 'invalid-longitude' } })
    fireEvent.blur(longitudeInput)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid longitude')).toBeInTheDocument()
    })
  })

  it('should raise suite/apt validation error when suite/apt is invalid', async () => {
    render(<Registration />)
    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter suite/apt')).toBeInTheDocument()
    })
  })

  it('should raise city validation error when city is invalid', async () => {
    render(<Registration />)
    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter city')).toBeInTheDocument()
    })
  })
})

