'use client';

import { HallwayEmbed } from "@/types/embed-loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { createContext, Suspense, useCallback, useContext, useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_ID = "7394103e-ba65-41d8-ac98-a43348cee84f";

type HallwayEmbedContextValue = {
  getDefinedElement: (signal?: AbortSignal) => Promise<HallwayEmbed>;
  volume: number;
  setVolume: (volume: number) => void;
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
  const hallwayEmbedRef = useRef<HallwayEmbed>(null);
  const [volume, setVolumeState] = useState(1);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    
    if (hallwayEmbedRef.current) {
      hallwayEmbedRef.current.setVolume(clampedVolume);
    }
  }, []);

  const getDefinedElement = useCallback((signal?: AbortSignal) => {
    return new Promise<HallwayEmbed>((resolve, reject) => {
      signal?.throwIfAborted()

      const listenerController = new AbortController();

      signal?.addEventListener("abort", () => {
        reject(signal.reason)
      }, { signal: listenerController.signal, once: true })

      customElements.whenDefined("hallway-embed").then(() => {
        if (!hallwayEmbedRef.current) {
          throw new Error(`<hallway-embed> is defined but "hallwayEmbedRef" is not set`)
        }
        resolve(hallwayEmbedRef.current)
      }).finally(() => {
        listenerController.abort()
      })
    })
  }, [])

  /**
   * Effect: Listen for <hallway-embed> events
   */
  useEffect(() => {
    if (!hallwayEmbedRef.current) return;

    const controller = new AbortController();

    hallwayEmbedRef.current.addEventListener(
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

    hallwayEmbedRef.current.addEventListener(
			"minimized",
			() => {
				console.log("minimized")
			},
			{ signal: controller.signal },
		);
		hallwayEmbedRef.current.addEventListener(
			"expanded",
			() => {
				console.log("expanded")
			},
			{ signal: controller.signal },
		);

    hallwayEmbedRef.current.addEventListener(
      "connected",
      () => {
        console.log("connected")
      },
      { signal: controller.signal },
    );

    return () => {
      controller.abort("Effect cleanup");
    };
  }, [router]);


  return (
    <>
      <hallway-embed
        ref={hallwayEmbedRef}
        style={{ zIndex: 100 }}
        character-id={process.env.NEXT_PUBLIC_HALLWAY_CHARACTER_ID || DEFAULT_CHARACTER_ID}
        disable-navigation="true"
      />
      <Script src="https://hallway.ai/embed-loader.js" strategy="afterInteractive" />
      <HallwayEmbedContext.Provider value={{ getDefinedElement, volume, setVolume }}>
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

  }, [pathname, searchParams, hallwayEmbed]);

  return null
}
