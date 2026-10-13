const COUNTER_ID = 101026698;
const CONSENT_KEY = 'cookie-consent';

export type CookieConsent = 'accepted' | 'declined' | null;

export const getConsent = (): CookieConsent => {
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'accepted' || v === 'declined' ? v : null;
};

export const setConsent = (value: 'accepted' | 'declined') => {
  localStorage.setItem(CONSENT_KEY, value);
  if (value === 'accepted') loadMetrika();
};

let loaded = false;

export const loadMetrika = () => {
  if (loaded) return;
  loaded = true;
  const w = window as any;
  w.ym =
    w.ym ||
    function (...args: unknown[]) {
      (w.ym.a = w.ym.a || []).push(args);
    };
  w.ym.l = Date.now();
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);
  w.ym(COUNTER_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
  });
};
