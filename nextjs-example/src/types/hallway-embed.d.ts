import "react"

// Import types dynamically so our declarations stay global https://stackoverflow.com/a/51114250
/* eslint-disable @typescript-eslint/consistent-type-imports */

type CustomElementProps<
	T extends HTMLElement,
	A extends Record<string, unknown>,
> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & A;

// Constructors

type HallwayEmbedMinimized =
	import("./embed-loader").HallwayEmbedMinimized;
type HallwayEmbedExpanded =
	import("./embed-loader").HallwayEmbedExpanded;
type HallwayEmbedBase =
	import("./embed-loader").HallwayEmbedBase;

// Attributes

type HallwayEmbedMinimizedAttributes =
	import("./embed-loader").HallwayEmbedMinimizedAttributes;
type HallwayEmbedExpandedAttributes =
	import("./embed-loader").HallwayEmbedExpandedAttributes;
type HallwayEmbedBaseAttributes =
	import("./embed-loader").HallwayEmbedBaseAttributes;


declare module "react" {
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
}