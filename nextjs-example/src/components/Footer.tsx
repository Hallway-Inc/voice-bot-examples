'use client';

import { HallwayEmbedBase } from "@/types/embed-loader";
import { useTheme } from "next-themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_ID = "7394103e-ba65-41d8-ac98-a43348cee84f";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hallwayEmbedBaseRef = useRef<HallwayEmbedBase>(null);

  /**
   * Effect: Listen for Next.js route changes and send to embed
   */
  useEffect(() => {
    const hallwayEmbedBaseEl = hallwayEmbedBaseRef.current;
    if (!hallwayEmbedBaseEl) return;

    let unmounted = false;

    const asyncFn = async () => {
      const url = new URL(window.location.href)
      url.pathname = pathname
      url.search = searchParams.toString()

      await customElements.whenDefined("hallway-embed-base")
      if (unmounted) return;

      hallwayEmbedBaseEl.sendHistoryState(url.toString())
    }

    asyncFn().catch((e) => console.error(`Error sending history state: ${e}`))

    return () => {
      unmounted = true;
    }
    
  }, [pathname, searchParams]);

  /**
   * Effect: Listen for <hallway-embed-base> events
   */
  useEffect(() => {
    if (!hallwayEmbedBaseRef.current) return;

    const controller = new AbortController();

    hallwayEmbedBaseRef.current.addEventListener(
      "navigate",
      (e: CustomEvent<{ url: string; openInNewTab?: boolean }>) => {
        if (e.detail.openInNewTab) {
          window.open(e.detail.url, "_blank");
        } else {
          void router.push(e.detail.url);
        }
      },
      { signal: controller.signal },
    );

    return () => {
      controller.abort("Effect cleanup");
    };
  }, [router]);

  return (
    <>
      <hallway-embed-base
        ref={hallwayEmbedBaseRef}
        style={{ zIndex: 100 }}
        character-id={process.env.NEXT_PUBLIC_HALLWAY_CHARACTER_ID || DEFAULT_CHARACTER_ID}
      />
      <Script src="https://hallway.ai/embed-loader.js" strategy="afterInteractive" />
      <div className="pb-[100px] w-full"></div>
    </>
  );
} 
