/**
 * TypeScript type declarations for AdMob/AdSense
 */

interface AdsbygoogleParams {
  [key: string]: any;
}

interface Window {
  adsbygoogle: AdsbygoogleParams[] | undefined;
}

declare global {
  interface Window {
    adsbygoogle: AdsbygoogleParams[] | undefined;
  }
}

export {};
