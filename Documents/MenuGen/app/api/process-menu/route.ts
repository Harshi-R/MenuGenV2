import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createWorker } from 'tesseract.js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Extract text using Tesseract.js
    const worker = await createWorker('eng')
    const { data: { text } } = await worker.recognize(image)
    await worker.terminate()

    // Parse menu items from OCR text
    const menuItems = parseMenuItems(text)

    // Generate images for each menu item
    const menuItemsWithImages = await Promise.all(
      menuItems.map(async (item) => {
        try {
          const imageResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Professional food photography of ${item.name}, appetizing, high quality, restaurant style, on a white plate, natural lighting`,
            n: 1,
            size: "1024x1024",
          })

          return {
            ...item,
            imageUrl: imageResponse.data[0].url,
          }
        } catch (error) {
          console.error(`Error generating image for ${item.name}:`, error)
          return {
            ...item,
            imageUrl: '/placeholder-dish.jpg', // Fallback image
          }
        }
      })
    )

    return NextResponse.json({
      menuItems: menuItemsWithImages,
      originalImage: image,
      extractedText: text,
    })

  } catch (error) {
    console.error('Error processing menu:', error)
    return NextResponse.json(
      { error: 'Failed to process menu' },
      { status: 500 }
    )
  }
}

function parseMenuItems(text: string) {
  // Simple parsing logic - in a real app, you'd want more sophisticated parsing
  const lines = text.split('\n').filter(line => line.trim().length > 0)
  const menuItems: Array<{ id: string; name: string; description?: string; price?: string }> = []

  for (const line of lines) {
    // Skip headers and common menu words
    const skipWords = ['menu', 'appetizers', 'entrees', 'desserts', 'drinks', 'beverages']
    const lowerLine = line.toLowerCase()
    if (skipWords.some(word => lowerLine.includes(word))) continue

    // Extract price (look for $XX.XX pattern)
    const priceMatch = line.match(/\$\d+\.?\d*/)
    const price = priceMatch ? priceMatch[0] : undefined

    // Extract dish name (everything before price, or first 50 chars)
    let name = line
    if (price) {
      name = line.substring(0, line.indexOf(price)).trim()
    }
    name = name.substring(0, 50).trim()

    // Skip if name is too short or contains common non-dish words
    if (name.length < 3 || /^(the|and|or|with|from)$/i.test(name)) continue

    menuItems.push({
      id: `item-${menuItems.length + 1}`,
      name,
      price,
    })
  }

  // Limit to first 10 items to avoid excessive API calls
  return menuItems.slice(0, 10)
} 