import "react"

import type {
  HallwayEmbed,
  HallwayEmbedAttributes,
  HallwayEmbedMinimized,
  HallwayEmbedMinimizedAttributes,
  HallwayEmbedExpanded,
  HallwayEmbedExpandedAttributes,
} from "./embed-loader";

type CustomElementProps<
  T extends HTMLElement,
  A extends Record<string, unknown>,
> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & A;

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
      "hallway-embed": CustomElementProps<HallwayEmbed, HallwayEmbedAttributes>;
    }
  }
}