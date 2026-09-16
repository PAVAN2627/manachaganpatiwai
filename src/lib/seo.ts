import { useEffect } from 'react';

export function setSeoMetadata({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}) {
  document.title = title;

  const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
    let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  setMeta('description', description);
  if (keywords) setMeta('keywords', keywords);
  if (ogTitle) setMeta('og:title', ogTitle, 'property');
  if (ogDescription) setMeta('og:description', ogDescription, 'property');
}

export function useSeoMetadata(opts: {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}) {
  useEffect(() => {
    setSeoMetadata(opts);
  }, [opts.title, opts.description, opts.keywords]);
}
