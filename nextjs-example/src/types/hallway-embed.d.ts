// Import types dynamically so our declarations stay global https://stackoverflow.com/a/51114250
/* eslint-disable @typescript-eslint/consistent-type-imports */

type CustomElementProps<
  T extends HTMLElement,
  A extends Record<string, unknown>,
> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & A;

// Constructors

type HallwayEmbedMinimized =
  import("@/embed/src/components/hallway-embed-minimized").HallwayEmbedMinimized;
type HallwayEmbedExpanded =
  import("@/embed/src/components/hallway-embed-expanded").HallwayEmbedExpanded;
type HallwayEmbedBase =
  import("@/embed/src/components/hallway-embed-base").HallwayEmbedBase;

// Attributes

type HallwayEmbedMinimizedAttributes =
  import("@/embed/src/components/hallway-embed-minimized").HallwayEmbedMinimizedAttributes;
type HallwayEmbedExpandedAttributes =
  import("@/embed/src/components/hallway-embed-expanded").HallwayEmbedExpandedAttributes;
type HallwayEmbedBaseAttributes =
  import("@/embed/src/components/hallway-embed-base").HallwayEmbedBaseAttributes;

// JSX
declare namespace JSX {
  interface IntrinsicElements {
    "hallway-embed-minimized": CustomElementProps<
      HallwayEmbedMinimized,
      HallwayEmbedMinimizedAttributes
    >;
    "hallway-embed-expanded": CustomElementProps<
      HallwayEmbedExpanded,
      HallwayEmbedExpandedAttributes
    >;
    "hallway-embed-base": CustomElementProps<
      HallwayEmbedBase,
      HallwayEmbedBaseAttributes
    >;
  }
} 