import { useEffect, useState } from 'react';

/**
 * Mobile-first detection hook.
 *
 *   - PRIMARY: `window.matchMedia('(max-width: 768px)')` so the
 *     detection follows the actual viewport at runtime (resize + rotate).
 *   - SECONDARY: user-agent sniff to catch tablets that lie about width
 *     when in portrait (e.g. iPad reports 768+ but is touch-first).
 *   - SSR-safe: returns `false` on the server until hydrated.
 *
 * Why we don't trust UA alone:
 *   - On a foldable in laptop posture, UA says mobile but viewport says desktop.
 *   - On an iPad in portrait, UA says mobile (if using iPadOS spoofed UA).
 *
 * In any case, the user can rotate / resize, and the hook reruns.
 */

export const MOBILE_BREAKPOINT = 768; // matches Tailwind's `md` boundary.

export function checkIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  // Width-based check (primary).
  if (window.matchMedia && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches) {
    return true;
  }
  // Tablet tablet-mobile hybrid: small portrait tablet (iPad mini etc.)
  // ≤ 820px wide AND touch + no mouse — treat as mobile for our purposes.
  if (window.matchMedia && window.matchMedia('(max-width: 820px)').matches) {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isHov = window.matchMedia('(hover: none)').matches;
    if (isTouch && isHov) return true;
  }
  // UA fallback.
  const ua = (navigator.userAgent || '').toLowerCase();
  if (/iphone|ipod|android.*mobile|mobile.*android|blackberry|windows phone|opera mini/i.test(ua)) {
    return true;
  }
  return false;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => checkIsMobile());

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const evalMobile = () => setIsMobile(checkIsMobile());
    // Modern browsers:
    if ('addEventListener' in query) {
      query.addEventListener('change', evalMobile);
      evalMobile();
      return () => query.removeEventListener('change', evalMobile);
    }
    // Older Webkit:
    // @ts-expect-error addListener is deprecated but still present on old Safari.
    query.addListener(evalMobile);
    evalMobile();
    return () => {
      // @ts-expect-error — see above
      query.removeListener(evalMobile);
    };
  }, []);

  return isMobile;
}

export function useIsLandscape(): boolean {
  const [isLandscape, setIsLandscape] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(orientation: landscape)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(orientation: landscape)');
    const update = () => setIsLandscape(query.matches);
    if ('addEventListener' in query) query.addEventListener('change', update);
    update();
    return () => {
      if ('removeEventListener' in query) query.removeEventListener('change', update);
    };
  }, []);
  return isLandscape;
}
