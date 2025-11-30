'use client'

import { Component } from 'react'
import MainBtn from '../ui/Buttons/MainBtn'
import Text3d from '../ui/text/Text3d'

export default class ErrorBoundary extends Component {
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
        <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-bg text-text py-12 px-4">
          <div className="border-l-20 border-t-20 p-16">
            <h1 className="text-4xl font-bold font-sec mb-4">
              <Text3d as="h1">WHATTTT!</Text3d>
            </h1>
            <p className="mb-4">Something went wrong. Please refresh the page.</p>
            {/* <button
              onClick={() => window.location.reload()}
              className="hover:bg-text hover:text-bg transition-colors duration-100 cursor-pointer"
            >
              Refresh Page
            </button> */}
            {/* <MainBtn href="/about">About Me</MainBtn> */}
            <MainBtn onClick={() => console.log('clicked')}>Contact</MainBtn>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
