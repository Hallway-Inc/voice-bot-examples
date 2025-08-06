//#region src/components/hallway-embed-minimized.d.ts
interface HallwayEmbedMinimizedAttributes {
  "greeting-text"?: string;
  "button-text"?: string;
  "avatar-image-url"?: string;
}
type HallwayEmbedMinimizedAttribute = keyof HallwayEmbedMinimizedAttributes;
declare class HallwayEmbedMinimized extends HTMLElement {
  #private;
  static get observedAttributes(): Array<HallwayEmbedMinimizedAttribute>;
  private avatarImageEl;
  private avatarVideoEl;
  private greetingEl;
  private buttonEl;
  constructor();
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
  /** Strictly typed setAttribute */
  setAttribute(name: HallwayEmbedMinimizedAttribute | `data-${string}`, value: string): void;
  /** Strictly typed removeAttribute */
  removeAttribute(name: HallwayEmbedMinimizedAttribute | `data-${string}`): void;
} //#endregion
//#region ../shared/embed.d.ts

/** Dictionary of message types to their data */
interface IframeToParentMessageMap {
  /** Iframe wants to navigate the outer page to a url */
  navigate: {
    url: string;
    openInNewTab: boolean;
  };
  close: Record<string, never>;
  /** Iframe connected and ready */
  connected: Record<string, never>;
  /** Iframe expanded state changed */
  expandedState: {
    isExpanded: boolean;
  };
}
/** Dictionary of event types to custom events produced by embed components */
type HallwayEmbedEventMap$1 = { [K in keyof IframeToParentMessageMap]: CustomEvent<IframeToParentMessageMap[K]> }; //#endregion
//#region src/components/hallway-embed-expanded.d.ts

/** Union of { type, data } objects received in "message" event from iframe*/
type HallwayEmbedExpandedAttribute = (typeof HallwayEmbedExpanded.observedAttributes)[number];
type HallwayEmbedExpandedAttributes = { [T in HallwayEmbedExpandedAttribute]?: string };
declare class HallwayEmbedExpanded extends HTMLElement {
  #private;
  static observedAttributes: readonly ["character-id", "frontend-url", "query", "expanded", "data-embed-base-init-time"];
  private iframeEl;
  private characterId?;
  private frontendUrl?;
  private query?;
  private expanded;
  private isMobile;
  private connectedController?;
  private embedBaseInitTime?;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Strictly typed setAttribute */
  setAttribute(name: HallwayEmbedExpandedAttribute | `data-${string}`, value: string): void;
  /** Strictly typed removeAttribute */
  removeAttribute(name: HallwayEmbedExpandedAttribute | `data-${string}`): void;
  /** Strictly typed event listeners */
  addEventListener<K extends keyof HallwayEmbedEventMap$1>(type: K, listener: (this: HallwayEmbedExpanded, ev: HallwayEmbedEventMap$1[K]) => void, options?: boolean | AddEventListenerOptions): void;
  /** Strictly typed event listeners */
  removeEventListener<K extends keyof HallwayEmbedEventMap$1>(type: K, listener: (this: HallwayEmbedExpanded, ev: HallwayEmbedEventMap$1[K]) => void, options?: boolean | EventListenerOptions): void;
  attributeChangedCallback(name: HallwayEmbedExpandedAttribute, oldValue: string | null, newValue: string | null): void;
  sendHistoryState(url: string): void;
  sendIsOpen(isOpen: boolean): void;
  sendUserContent(content: string): void;
  sendTryReconnect(): void;
  sendVolumeChange(volume: number): void;
}

//#endregion
//#region src/components/hallway-embed.d.ts
type HallwayEmbedAttribute = (typeof HallwayEmbed.observedAttributes)[number];
type HallwayEmbedAttributes = { [T in HallwayEmbedAttribute]?: string };
interface HallwayEmbedEventMap {
  navigate: CustomEvent<{
    url: string;
    openInNewTab: boolean;
  }>;
  expanded: CustomEvent<void>;
  minimized: CustomEvent<void>;
  connected: CustomEvent<void>;
  volumeChanged: CustomEvent<{
    volume: number;
  }>;
}
declare class HallwayEmbed extends HTMLElement {
  #private;
  static observedAttributes: readonly ["character-id", "frontend-url", "query", "api-url", "disable-navigation"];
  hallwayEmbedExpandedEl: HallwayEmbedExpanded;
  hallwayEmbedMinimizedEl: HallwayEmbedMinimized;
  private visibility?;
  private apiUrl?;
  private characterId?;
  private loadConfigController?;
  private config?;
  private isMounted;
  private embedBaseInitTime;
  private isMobileExpanded;
  private pendingCleanupNavigation?;
  private currentVolume;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: HallwayEmbedAttribute, oldValue: string | null, newValue: string | null): void;
  /** Strictly typed setAttribute */
  setAttribute(name: HallwayEmbedAttribute | `data-${string}`, value: string): void;
  /** Strictly typed removeAttribute */
  removeAttribute(name: HallwayEmbedAttribute | `data-${string}`): void;
  /** Strictly typed event listeners */
  addEventListener<K extends keyof HallwayEmbedEventMap>(type: K, listener: (this: HallwayEmbed, ev: HallwayEmbedEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
  /** Strictly typed event listeners */
  removeEventListener<K extends keyof HallwayEmbedEventMap>(type: K, listener: (this: HallwayEmbed, ev: HallwayEmbedEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
  sendUserContent(content: string): void;
  sendHistoryState(url: string): void;
  setVolume(volume: number): void;
  getVolume(): number;
}

//#endregion
export { HallwayEmbed, HallwayEmbedAttributes, HallwayEmbedExpanded, HallwayEmbedExpandedAttributes, HallwayEmbedMinimized, HallwayEmbedMinimizedAttributes };