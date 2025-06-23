'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { MenuUpload } from '@/components/menu-upload'
import { ResultsDisplay } from '@/components/results-display'
import { CreditSystem } from '@/components/credit-system'

export default function Home() {
  const { data: session, status } = useSession()
  const [results, setResults] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {!session ? (
        <Hero />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome back, {session.user?.name}!
              </h1>
              <p className="text-lg text-gray-600">
                Upload a menu and let AI create beautiful dish visualizations
              </p>
            </div>

            <CreditSystem />

            {!results ? (
              <MenuUpload 
                onResults={setResults}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            ) : (
              <ResultsDisplay 
                results={results}
                onReset={() => setResults(null)}
              />
            )}
          </div>
        </main>
      )}
    </div>
  )
} 