'use client'

import { useState } from 'react'
import { CreditCard, Coins, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface CreditSystemProps {}

export function CreditSystem({}: CreditSystemProps) {
  const [credits, setCredits] = useState(5) // Mock credits - in real app, fetch from API
  const [isLoading, setIsLoading] = useState(false)

  const creditPackages = [
    { credits: 10, price: 5, popular: false },
    { credits: 25, price: 10, popular: true },
    { credits: 50, price: 18, popular: false },
  ]

  const handlePurchase = async (packageCredits: number, price: number) => {
    setIsLoading(true)
    try {
      // In a real app, this would redirect to Stripe checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: packageCredits,
          price: price,
        }),
      })

      if (response.ok) {
        const { url } = await response.json()
        window.location.href = url
      } else {
        throw new Error('Failed to create checkout session')
      }
    } catch (error) {
      toast.error('Failed to process payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Coins className="h-6 w-6 text-yellow-500" />
          <span className="text-lg font-semibold">Credits: {credits}</span>
        </div>
        <button
          onClick={() => document.getElementById('credit-modal')?.classList.remove('hidden')}
          className="btn btn-primary btn-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Buy Credits
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Each menu processing costs 1 credit. You have {credits} credits remaining.
      </div>

      {/* Credit Purchase Modal */}
      <div id="credit-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Purchase Credits</h3>
            <button
              onClick={() => document.getElementById('credit-modal')?.classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {creditPackages.map((pkg, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  pkg.popular ? 'border-primary bg-primary-50' : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => handlePurchase(pkg.credits, pkg.price)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{pkg.credits} Credits</span>
                      {pkg.popular && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${pkg.price} (${(pkg.price / pkg.credits).toFixed(2)} per credit)
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Processing payment...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 