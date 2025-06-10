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
  private avatarEl;
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
  /** Iframe expanded state changed */
  expandedState: {
    isExpanded: boolean;
  };
}
/** Dictionary of event types to custom events produced by embed components */
type HallwayEmbedEventMap = { [K in keyof IframeToParentMessageMap]: CustomEvent<IframeToParentMessageMap[K]> }; //#endregion
//#region src/components/hallway-embed-expanded.d.ts

/** Union of { type, data } objects received in "message" event from iframe*/
type HallwayEmbedExpandedAttribute = (typeof HallwayEmbedExpanded.observedAttributes)[number];
type HallwayEmbedExpandedAttributes = { [T in HallwayEmbedExpandedAttribute]?: string };
declare class HallwayEmbedExpanded extends HTMLElement {
  #private;
  static observedAttributes: readonly ["character-id", "frontend-url", "query", "expanded"];
  private iframeEl;
  private characterId?;
  private frontendUrl?;
  private query?;
  private expanded;
  private isMobile;
  private connectedController?;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Strictly typed setAttribute */
  setAttribute(name: HallwayEmbedExpandedAttribute | `data-${string}`, value: string): void;
  /** Strictly typed removeAttribute */
  removeAttribute(name: HallwayEmbedExpandedAttribute | `data-${string}`): void;
  /** Strictly typed event listeners */
  addEventListener<K extends keyof HallwayEmbedEventMap>(type: K, listener: (this: HallwayEmbedExpanded, ev: HallwayEmbedEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
  /** Strictly typed event listeners */
  removeEventListener<K extends keyof HallwayEmbedEventMap>(type: K, listener: (this: HallwayEmbedExpanded, ev: HallwayEmbedEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
  attributeChangedCallback(name: HallwayEmbedExpandedAttribute, oldValue: string | null, newValue: string | null): void;
  sendHistoryState(url: string): void;
  sendIsOpen(isOpen: boolean): void;
  sendUserContent(content: string): void;
  sendTryReconnect(): void;
}

//#endregion
//#region src/components/hallway-embed-base.d.ts
type HallwayEmbedBaseAttribute = (typeof HallwayEmbedBase.observedAttributes)[number];
type HallwayEmbedBaseAttributes = { [T in HallwayEmbedBaseAttribute]?: string };
interface HallwayEmbedBaseEventMap {
  navigate: CustomEvent<{
    url: string;
    openInNewTab: boolean;
  }>;
}
declare class HallwayEmbedBase extends HTMLElement {
  #private;
  static observedAttributes: readonly ["character-id", "frontend-url", "query", "api-url"];
  hallwayEmbedExpandedEl: HallwayEmbedExpanded;
  hallwayEmbedMinimizedEl: HallwayEmbedMinimized;
  private visibility?;
  private apiUrl?;
  private characterId?;
  private loadConfigController?;
  private config?;
  private isMounted;
  private isMobileExpanded;
  constructor();
  connectedCallback(): void;
  attributeChangedCallback(name: HallwayEmbedBaseAttribute, oldValue: string | null, newValue: string | null): void;
  /** Strictly typed setAttribute */
  setAttribute(name: HallwayEmbedBaseAttribute | `data-${string}`, value: string): void;
  /** Strictly typed removeAttribute */
  removeAttribute(name: HallwayEmbedBaseAttribute | `data-${string}`): void;
  /** Strictly typed event listeners */
  addEventListener<K extends keyof HallwayEmbedBaseEventMap>(type: K, listener: (this: HallwayEmbedBase, ev: HallwayEmbedBaseEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
  /** Strictly typed event listeners */
  removeEventListener<K extends keyof HallwayEmbedBaseEventMap>(type: K, listener: (this: HallwayEmbedBase, ev: HallwayEmbedBaseEventMap[K]) => void, options?: boolean | EventListenerOptions): void;
  sendUserContent(content: string): void;
  sendHistoryState(url: string): void;
}

//#endregion
//#region src/components/hallway-embed.d.ts
type HallwayEmbedAttribute = (typeof HallwayEmbed.observedAttributes)[number];
type HallwayEmbedAttributes = { [T in HallwayEmbedAttribute]?: string };
declare class HallwayEmbed extends HTMLElement {
  #private;
  static observedAttributes: readonly ["character-id", "frontend-url", "query", "api-url"];
  hallwayEmbedBaseEl: HallwayEmbedBase;
  constructor();
  attributeChangedCallback(name: HallwayEmbedAttribute, oldValue: string | null, newValue: string | null): void;
}

//#endregion
export { HallwayEmbed, HallwayEmbedAttributes, HallwayEmbedBase, HallwayEmbedBaseAttributes, HallwayEmbedExpanded, HallwayEmbedExpandedAttributes, HallwayEmbedMinimized, HallwayEmbedMinimizedAttributes };