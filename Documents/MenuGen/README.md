# MenuGenV2 - AI Menu Visualization

Transform restaurant menus into beautiful dish visualizations using AI. Upload a menu photo and get AI-generated images of every dish to help you make informed dining decisions.

## Features

- 📸 **Smart OCR**: Advanced text recognition extracts menu items with high accuracy
- 🎨 **AI Image Generation**: DALL-E powered image generation creates realistic dish visualizations
- 🔐 **Google OAuth**: Secure authentication with Google accounts
- 💳 **Credit System**: Pay-per-use system with Stripe integration
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- ⚡ **Fast Processing**: Optimized pipeline for quick results

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **OCR**: Tesseract.js for text extraction
- **AI**: OpenAI DALL-E 3 for image generation
- **Payments**: Stripe for credit purchases
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google OAuth credentials
- OpenAI API key
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MenuGenV2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key-here

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # OpenAI API
   OPENAI_API_KEY=your-openai-api-key

   # Stripe Configuration
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

### OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the API key to your `.env.local`

### Stripe Setup

1. Create a [Stripe account](https://stripe.com/)
2. Get your API keys from the dashboard
3. Set up a webhook endpoint pointing to `/api/webhook/stripe`
4. Add the keys to your `.env.local`

## Usage

1. **Sign in** with your Google account
2. **Upload a menu** by taking a photo or selecting an image file
3. **Process the menu** - AI will extract menu items and generate dish images
4. **Browse results** - View all generated dish visualizations
5. **Download images** - Save your favorite dish images
6. **Purchase credits** - Buy more credits for additional menu processing

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Update OAuth Redirect URIs**
   - Update Google OAuth redirect URI to your Vercel domain
   - Update Stripe webhook endpoint to your Vercel domain

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: A secure random string
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `OPENAI_API_KEY`: Your OpenAI API key
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

## Project Structure

```
MenuGenV2/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth configuration
│   │   ├── process-menu/  # Menu processing endpoint
│   │   └── webhook/       # Stripe webhooks
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth-provider.tsx  # Authentication provider
│   ├── credit-system.tsx  # Credit management
│   ├── hero.tsx          # Landing page hero
│   ├── menu-upload.tsx   # Menu upload interface
│   ├── navigation.tsx    # Navigation bar
│   └── results-display.tsx # Results display
├── public/               # Static assets
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vercel.json          # Vercel deployment config
```

## API Endpoints

- `POST /api/process-menu` - Process menu image and generate dish visualizations
- `POST /api/create-checkout-session` - Create Stripe checkout session for credits
- `POST /api/webhook/stripe` - Handle Stripe webhook events
- `GET/POST /api/auth/[...nextauth]` - NextAuth authentication routes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [OpenAI](https://openai.com/) for DALL-E image generation
- [Stripe](https://stripe.com/) for payment processing
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR functionality
- [Tailwind CSS](https://tailwindcss.com/) for styling 