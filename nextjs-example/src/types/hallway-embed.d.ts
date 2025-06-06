import "react"

import type {
  HallwayEmbedBase,
  HallwayEmbedBaseAttributes,
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
      "hallway-embed-base": CustomElementProps<
        HallwayEmbedBase,
        HallwayEmbedBaseAttributes
      >;
    }
  }
}