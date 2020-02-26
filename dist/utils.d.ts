export declare const BrowserName: {
    ALL: string;
    CHROME: string;
    FIREFOX: string;
    SAFARI: string;
};
export declare const BrowserOS: {
    ANDROID: string;
    IOS: string;
};
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, style?: CSSStyleDeclaration | object): HTMLElementTagNameMap[K];
export declare function isBrowserVersion(name: string, version?: number, os?: string | null, versionTo?: number): boolean;
