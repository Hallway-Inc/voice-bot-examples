import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'hallway-embed-base': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'character-id'?: string;
          query?: string;
          ref?: React.RefObject<HTMLElement & {
            addEventListener(
              type: "navigate",
              listener: (event: CustomEvent<{ url: string; openInNewTab?: boolean }>) => void,
              options?: AddEventListenerOptions
            ): void;
          }>;
        },
        HTMLElement
      >;
    }
  }
} 