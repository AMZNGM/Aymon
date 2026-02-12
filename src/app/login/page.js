'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      setUser(result.user)
      router.push('/admin')
    } catch (error) {
      console.error('Error signing in with email:', error)
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.')
          break
        case 'auth/wrong-password':
          setError('Incorrect password.')
          break
        case 'auth/invalid-email':
          setError('Invalid email address.')
          break
        case 'auth/user-disabled':
          setError('This account has been disabled.')
          break
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.')
          break
        default:
          setError('Failed to sign in. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="relative w-dvw h-dvh overflow-hidden bg-text text-bg flex flex-col justify-center items-center">
      {!user ? (
        <form onSubmit={handleEmailSignIn} className="w-full max-w-sm space-y-4">
          {error && (
            <div className="bg-red-600/20 rounded-md border border-red-600 text-red-400 px-4 py-3 text-sm w-full h-fit text-wrap whitespace-pre-wrap">
              {error}
            </div>
          )}

          {Object.entries(formData).map(([name, value]) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium mb-2">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <input
                id={name}
                name={name}
                type={name === 'password' ? 'password' : 'text'}
                autoComplete={name === 'email' ? 'email' : 'current-password'}
                required
                value={value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg placeholder-bg/50"
                placeholder={name === 'email' ? 'admin@example.com' : '••••••••'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-text bg-main hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <button className="text-center">
            <Link href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              ← Back to portfolio
            </Link>
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm opacity-80">Signed in as:</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex justify-center py-2 px-4 border border-main text-sm font-medium rounded-md text-main hover:bg-main hover:text-text transition-all"
          >
            Sign Out
          </button>

          <Link href="/admin" className="block w-full text-center py-2 px-4 bg-main text-text rounded-md hover:bg-main/90 transition-all">
            Go to Admin Panel
          </Link>
        </div>
      )}
    </div>
  )
}
