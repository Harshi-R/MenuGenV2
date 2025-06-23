'use client'

import { signIn } from 'next-auth/react'
import { Camera, Sparkles, Zap, Shield } from 'lucide-react'

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Camera className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Menus into
            <span className="text-primary block">Visual Delights</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload a restaurant menu and watch as AI creates beautiful, appetizing images 
            of every dish. Make informed dining decisions with visual previews.
          </p>
          
          <button
            onClick={() => signIn('google')}
            className="btn btn-primary btn-lg text-lg px-8 py-4"
          >
            Get Started with Google
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card p-6">
            <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart OCR</h3>
            <p className="text-gray-600">
              Advanced text recognition extracts menu items with high accuracy
            </p>
          </div>
          
          <div className="card p-6">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
            <p className="text-gray-600">
              DALL-E powered image generation creates realistic dish visualizations
            </p>
          </div>
          
          <div className="card p-6">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get your menu visualized in seconds with our optimized pipeline
            </p>
          </div>
        </div>

        <div className="mt-16 p-6 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Secure & Private</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your menu images are processed securely and never stored permanently. 
            We use industry-standard encryption and privacy practices.
          </p>
        </div>
      </div>
    </div>
  )
} 