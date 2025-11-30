import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='relative w-screen min-h-screen flex items-center justify-center overflow-hidden bg-bg text-text font-fake py-12 px-4'>
          <div className='max-w-md text-center border border-b-0 border-main p-2'>
            <h1 className='text-4xl font-bold mb-4'>Ofofofofofof!</h1>
            <p className='mb-4'>
              Besm Ellalh Arrahman Arraheim. <br />
              Something went wrong. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='px-6 py-3 border border-b-0 border-main hover:bg-text hover:text-bg transition-colors duration-100 cursor-pointer'>
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
