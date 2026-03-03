'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signInWithEmailAndPassword(auth!, formData.email, formData.password)
      setUser(result.user)
      router.push('/admin')
    } catch (e: unknown) {
      const error = e as FirebaseError
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-dvw h-dvh overflow-hidden bg-text text-bg hide-footer">
      {!user ? (
        <form onSubmit={handleEmailSignIn} className="space-y-4 w-full max-w-sm">
          {error && (
            <div className="w-full h-fit bg-red-600/20 border border-red-600 rounded-md text-red-400 text-sm text-wrap whitespace-pre-wrap px-4 py-3">
              {error}
            </div>
          )}

          {Object.entries(formData).map(([name, value]) => (
            <div key={name}>
              <label htmlFor={name} className="block font-medium text-sm mb-2">
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
                className="w-full bg-bg/20 border border-bg/30 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-bg px-3 py-2 placeholder-bg/50"
                placeholder={name === 'email' ? 'admin@example.com' : '••••••••'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="group relative flex justify-center w-full bg-main hover:bg-main/90 disabled:opacity-50 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 font-medium text-text text-sm transition-all px-4 py-3 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <button className="text-center">
            <Link href="/" className="opacity-80 hover:opacity-100 text-sm transition-opacity">
              ← Back to portfolio
            </Link>
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="opacity-80 text-sm">Signed in as:</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex justify-center w-full hover:bg-main border border-main rounded-md font-medium text-main hover:text-text text-sm transition-all px-4 py-2"
          >
            Sign Out
          </button>

          <Link href="/admin" className="block w-full bg-main hover:bg-main/90 rounded-md text-text text-center transition-all px-4 py-2">
            Go to Admin Panel
          </Link>
        </div>
      )}
    </div>
  )
}
