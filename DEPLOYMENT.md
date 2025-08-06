# Free Software Store - Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zero3-web/Free_Software.git)

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn package manager
- Git

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Zero3-web/Free_Software.git
cd Free_Software
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## Deploy to Vercel

### Option 1: Automatic Deploy (Recommended)

1. Fork or clone this repository to your GitHub account
2. Go to [Vercel](https://vercel.com)
3. Sign in with your GitHub account
4. Click "New Project"
5. Import your repository
6. Configure project settings:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
7. Click "Deploy"

### Option 2: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project directory:
```bash
vercel --prod
```

## Environment Variables

No environment variables are required for basic deployment.

## Build Configuration

The project includes a `vercel.json` file with optimized settings:

- **Headers**: Security headers for better protection
- **Caching**: Optimized caching for static assets
- **Redirects**: SEO-friendly redirects

## Performance Optimizations

- ✅ **Mobile-first responsive design**
- ✅ **Optimized images and assets**
- ✅ **Minimal CSS and JavaScript**
- ✅ **Enhanced contrast for accessibility**
- ✅ **Light theme optimized for readability**
- ✅ **Fast loading times**

## Features

- 🎨 **Modern Design**: Clean, professional interface
- 📱 **Mobile-First**: Optimized for all devices
- ⚡ **Fast Performance**: Lightweight and optimized
- 🔍 **SEO Optimized**: Better search engine visibility
- ♿ **Accessible**: Enhanced contrast and keyboard navigation
- 🛡️ **Secure**: Security headers and best practices

## Technology Stack

- **Framework**: Astro 5.x
- **Frontend**: React 19.x
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety

## Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Support

For deployment issues or questions, please check:

1. [Vercel Documentation](https://vercel.com/docs)
2. [Astro Documentation](https://docs.astro.build)
3. Create an issue in this repository

## License

This project is open source and available under the MIT License.
