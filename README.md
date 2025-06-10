# Voice Bot Examples

This repository contains examples of how to implement the Voice Bot embed script across different web frameworks and platforms. Each example demonstrates best practices for integration and showcases different implementation approaches.

## Examples

### 1. Next.js Example (`/nextjs-example`)
A modern Next.js application showcasing how to implement the Voice Bot embed script in a React-based application using the App Router. This example includes:
- TypeScript support
- Tailwind CSS for styling
- ESLint for code quality
- Modern React patterns and best practices

## Getting Started

Each example has its own README with specific instructions on how to run and test the implementation. Navigate to the example directory you're interested in and follow the instructions in its README.

## Contributing

Feel free to contribute additional examples or improvements to existing ones by submitting a pull request.


## Embed Usage Guide

### Installation

To start using Hallway's embed, include the embed loader script on your page.

```html
<script src="https://hallway.ai/embed-loader.js" async></script>
```

This defines various [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), including:

- `<hallway-embed-minimized>` - Minimized view when the embed is closed
- `<hallway-embed-expanded>` - Expanded view of the bot which grows to fill its container, suitable for fully custom layouts
- `<hallway-embed-base>` - Basic embed component that orchestrates minimized and expanded views, suitable for most custom integrations
- `<hallway-embed>` - Batteries-included wrapper around the base element with default handling of navigation events

The following sections describe features of the `<hallway-embed-base>` component, which has roughly the same API as `<hallway-embed-expanded>`.

### Attributes
- `character-id`: The unique ID for a Hallway character, such as "18688523-d2d5-47e3-a5ce-e689395c7172"

### Methods

Note that depending on the timing of when the loader script runs relative to your logic, you may need to wait for [customElements.whenDefined()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/whenDefined) before invoking methods on the element.

- `sendUserContent(content: string)`: Send custom "user" message content to the LLM, triggering a response
- `sendHistoryState(url: string)`: Inform the bot of the current page URL

### Events
- `navigate`: Fired when the bot wants to navigate to a new URL

  Event detail:
    ```typescript
    {
      url: string;
      openInNewTab: boolean;
    }
    ```

### Sending custom messages

Call `.sendUserContent()` with a "user" message of your choice.

```js
button.onclick = () => {
  hallwayEmbedBaseEl.sendUserContent("Say hello")
}
```

You could use this to send a standalone message like "What's up?", or prompt the model with context about events happening on the page like "The user scrolled to a picture of a cat".


### Site navigation

Characters can automatically navigate the page and speak about what you're looking at.

To support auto-navigation, listen for `"navigate"` events and navigate to the requested URL with your site's client-side routing mechanism.

```js
hallwayEmbedBaseEl.addEventListener("navigate", (event) => {
  // Route the user to the requested URL according to your framework
  event.detail.url
})
```

To ensure the character is aware of pages the user navigates to independently, call `.sendHistoryState()` on the element in response to your site's client-side route changes.

```js
const handleRouteChange = (url: string) => {
  hallwayEmbedBaseEl.sendHistoryState(url)
}
```