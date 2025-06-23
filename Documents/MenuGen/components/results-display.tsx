'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, Heart } from 'lucide-react'
import Image from 'next/image'

interface MenuItem {
  id: string
  name: string
  description?: string
  price?: string
  imageUrl: string
}

interface ResultsDisplayProps {
  results: {
    menuItems: MenuItem[]
    originalImage: string
  }
  onReset: () => void
}

export function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const toggleLike = (itemId: string) => {
    const newLikedItems = new Set(likedItems)
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId)
    } else {
      newLikedItems.add(itemId)
    }
    setLikedItems(newLikedItems)
  }

  const downloadImage = (imageUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `${fileName}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MenuGenV2 Results',
          text: 'Check out these amazing dish visualizations!',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="btn btn-outline btn-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Process New Menu
        </button>
        
        <div className="flex space-x-2">
          <button
            onClick={shareResults}
            className="btn btn-outline btn-sm"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>

      {/* Original Menu */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Original Menu</h3>
        <div className="flex justify-center">
          <img
            src={results.originalImage}
            alt="Original menu"
            className="max-w-full h-64 object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Results Grid */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-6">
          Generated Dish Visualizations ({results.menuItems.length} items)
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.menuItems.map((item) => (
            <div
              key={item.id}
              className="card p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(item.id)
                  }}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
                    likedItems.has(item.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                {item.description && (
                  <p className="text-sm text-gray-600">{item.description}</p>
                )}
                {item.price && (
                  <p className="text-sm font-medium text-primary">{item.price}</p>
                )}
              </div>
              
              <div className="mt-4 flex justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadImage(item.imageUrl, item.name)
                  }}
                  className="btn btn-outline btn-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              {selectedItem.description && (
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
              )}
              
              {selectedItem.price && (
                <p className="text-lg font-semibold text-primary mb-4">
                  {selectedItem.price}
                </p>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={() => downloadImage(selectedItem.imageUrl, selectedItem.name)}
                  className="btn btn-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Image
                </button>
                <button
                  onClick={() => toggleLike(selectedItem.id)}
                  className={`btn ${
                    likedItems.has(selectedItem.id) ? 'btn-outline' : 'btn-outline'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${
                    likedItems.has(selectedItem.id) ? 'text-red-500' : ''
                  }`} />
                  {likedItems.has(selectedItem.id) ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 