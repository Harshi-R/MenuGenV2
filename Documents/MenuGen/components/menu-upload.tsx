'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Camera, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface MenuUploadProps {
  onResults: (results: any) => void
  isProcessing: boolean
  setIsProcessing: (processing: boolean) => void
}

export function MenuUpload({ onResults, isProcessing, setIsProcessing }: MenuUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const processMenu = async () => {
    if (!uploadedImage) return

    setIsProcessing(true)
    toast.loading('Processing your menu...', { id: 'processing' })

    try {
      const response = await fetch('/api/process-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process menu')
      }

      const results = await response.json()
      toast.success('Menu processed successfully!', { id: 'processing' })
      onResults(results)
    } catch (error) {
      console.error('Error processing menu:', error)
      toast.error('Failed to process menu. Please try again.', { id: 'processing' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <div className="text-center mb-6">
          <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload Your Menu
          </h2>
          <p className="text-gray-600">
            Take a photo of a restaurant menu or upload an existing image
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary-50'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          {uploadedImage ? (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Uploaded menu"
                className="max-w-full h-64 object-contain mx-auto rounded-lg"
              />
              <p className="text-sm text-gray-600">
                Menu uploaded successfully! Click to change or process now.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop the menu here' : 'Drag & drop your menu here'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  or click to browse files
                </p>
              </div>
              <p className="text-xs text-gray-500">
                Supports JPEG, PNG, WebP up to 10MB
              </p>
            </div>
          )}
        </div>

        {uploadedImage && (
          <div className="mt-6 text-center">
            <button
              onClick={processMenu}
              disabled={isProcessing}
              className="btn btn-primary btn-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing Menu...
                </>
              ) : (
                'Process Menu & Generate Images'
              )}
            </button>
          </div>
        )}
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">How it works:</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="text-center">
            <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold">1</span>
            </div>
            <p>Upload a clear photo of the menu</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold">2</span>
            </div>
            <p>AI extracts menu items using OCR</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-semibold">3</span>
            </div>
            <p>Generate beautiful dish visualizations</p>
          </div>
        </div>
      </div>
    </div>
  )
} 