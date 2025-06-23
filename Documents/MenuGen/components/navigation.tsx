'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Camera, User, LogOut, LogIn } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">MenuGenV2</span>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="btn btn-outline btn-sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="btn btn-primary btn-sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 