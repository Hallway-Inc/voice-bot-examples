# Astro Example

```bash
pnpm install
pnpm dev
```

This example uses [Swup](https://swup.js.org/) to perform clientside navigation using [the manual swup setup](https://github.com/swup/astro/blob/e1b65955d03fcc0fe5adc11e0ad80768511c4e0f/README.md#control-over-the-initialization) described in [Swup's Astro integration](https://github.com/swup/astro).

Although Astro includes a first-party [<ClientRouter />](https://docs.astro.build/en/reference/modules/astro-transitions/#clientrouter-) that can persist elements, it has a [known limitation](https://github.com/withastro/docs/blob/b4d0c6066d3df4f6e0229c07a13fc45d4ef4c562/src/content/docs/en/guides/view-transitions.mdx#L115) that causes iframes to refresh.

The Hallway embed and swup logic lives in `src/pages/Layout.astro`
