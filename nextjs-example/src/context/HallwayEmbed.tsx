'use client';

import { HallwayEmbedBase } from "@/types/embed-loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { createContext, Suspense, useCallback, useContext, useEffect, useRef } from "react";

const DEFAULT_CHARACTER_ID = "7394103e-ba65-41d8-ac98-a43348cee84f";

type HallwayEmbedContextValue = {
  getDefinedElement: (signal?: AbortSignal) => Promise<HallwayEmbedBase>;
}

const HallwayEmbedContext = createContext<HallwayEmbedContextValue | null>(null);

export function useHallwayEmbed() {
  const context = useContext(HallwayEmbedContext);
  if (!context) {
    throw new Error("useHallwayEmbed() must be called within <HallwayEmbedProvider>");
  }
  return context;
}

export function HallwayEmbedProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hallwayEmbedBaseRef = useRef<HallwayEmbedBase>(null);

  const getDefinedElement = useCallback((signal?: AbortSignal) => {
    return new Promise<HallwayEmbedBase>((resolve, reject) => {
      signal?.throwIfAborted()

      const listenerController = new AbortController();

      signal?.addEventListener("abort", () => {
        reject(signal.reason)
      }, { signal: listenerController.signal, once: true })

      customElements.whenDefined("hallway-embed-base").then(() => {
        if (!hallwayEmbedBaseRef.current) {
          throw new Error(`<hallway-embed-base> is defined but "hallwayEmbedBaseRef" is not set`)
        }
        resolve(hallwayEmbedBaseRef.current)
      }).finally(() => {
        listenerController.abort()
      })
    })
  }, [])

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
      <HallwayEmbedContext.Provider value={{ getDefinedElement }}>
        {children}
        {/* Wrapped in Suspense boundary due to useSearchParams() */}
        <Suspense>
          <HallwayEmbedHistoryState />
        </Suspense>
      </HallwayEmbedContext.Provider>
    </>
  );
}

function HallwayEmbedHistoryState() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hallwayEmbed = useHallwayEmbed()

  /**
   * Effect: Listen for Next.js route changes and send to embed
   */
  useEffect(() => {
    const controller = new AbortController();

    const asyncFn = async () => {
      const url = new URL(window.location.href)
      url.pathname = pathname
      url.search = searchParams.toString()

      const el = await hallwayEmbed.getDefinedElement(controller.signal)
      el.sendHistoryState(url.toString())
    }

    asyncFn().catch((e) => { if (!controller.signal.aborted) console.error(`Error sending history state: ${e}`) })

    return () => {
      controller.abort();
    }

  }, [pathname, searchParams]);

  return null
}