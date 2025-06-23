# Next.js Voice Bot Example

Live demo: https://voice-bot-next-js-example.vercel.app/

This example demonstrates how to implement the Voice Bot embed script in a Next.js application using the App Router.

## Features

- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- Voice Bot integration example

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation Details

The Voice Bot embed script is implemented in the root layout file (`src/app/layout.tsx`) to ensure it's available across all pages of the application. The implementation showcases:

- Proper script loading
- TypeScript integration
- Configuration options
- Best practices for Next.js

## Project Structure

```
src/
├── app/
│   ├── layout.tsx    # Root layout with Voice Bot integration
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # Reusable components
└── types/           # TypeScript type definitions
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Voice Bot Documentation](https://docs.hallway.com)
