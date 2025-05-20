# HTML Voice Bot Example

This example demonstrates how to implement the Voice Bot embed script in a simple static HTML/CSS application.

## Features

- Pure HTML and CSS implementation
- Simple, static page navigation
- Responsive design
- Voice Bot integration
- Ready for Vercel deployment

## Important Note

This is a basic static HTML example that demonstrates the minimal setup required for the Voice Bot embed. For more advanced features like:
- Automatic navigation when the bot suggests a page
- Theme switching (dark/light mode)
- Dynamic content updates

Please check out the Next.js example which uses a Single Page Application (SPA) architecture.

## Running Locally

Since this is a static site, you can use any HTTP server to run it locally. Here are a few options:

1. Using Python:
```bash
# Python 3
python -m http.server 3000
# Python 2
python -m SimpleHTTPServer 3000
```

2. Using Node.js (with `http-server`):
```bash
# Install http-server globally
npm install -g http-server
# Run the server
http-server -p 3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This example is ready to deploy on Vercel:

1. Install the [Vercel CLI](https://vercel.com/cli):
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Project Structure

```
html-example/
├── index.html      # Home page
├── red.html        # Red page
├── blue.html       # Blue page
├── green.html      # Green page
├── styles.css      # Styles
└── vercel.json     # Vercel configuration
```

## Implementation Details

The Voice Bot embed script is implemented in each HTML file, showcasing:
- Basic script loading
- Simple page navigation
- Clean, responsive design
- Best practices for static sites 