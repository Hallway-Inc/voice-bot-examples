'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface OutgoingMessage {
  type: string;
  url: string;
  openInNewTab?: boolean;
}

interface FooterProps {
  includeEmbed?: boolean;
}

export default function Footer({ includeEmbed = false }: FooterProps) {
  const router = useRouter();

  useEffect(() => {
    if (!includeEmbed) return;

    // Message handler for iframe communication
    const messageHandler = (event: MessageEvent) => {
      console.log("messageHandler", event);
      // Type guard to ensure event.data has the expected structure
      if (event.data && typeof event.data === "object") {
        const data = event.data as OutgoingMessage;
        console.log(data)

        if (data.type === "url") {
          if (data.openInNewTab) {
            window.open(data.url, "_blank");
          } else {
            void router.push(data.url);
          }
        }
      }
    };

    // Add event listener
    window.addEventListener("message", messageHandler);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, [router, includeEmbed]);

  return (
    <footer className="w-full py-4 text-center text-sm text-gray-600">
      {includeEmbed && (
        <>
          {/* @ts-expect-error - hallway-embed is a custom element defined by the embed-loader.js script */}
          <hallway-embed
            character-id="7394103e-ba65-41d8-ac98-a43348cee84f"
            custom-navigation="true"
          />
          <script src="https://hallway.ai/embed-loader.js" async type="text/javascript"></script>
        </>
      )}
    </footer>
  );
} 