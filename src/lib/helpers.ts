export function slugifyMarathi(text: string): string {
  const map: Record<string, string> = {
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
  };
  let result = text.trim().toLowerCase();
  for (const [dev, num] of Object.entries(map)) {
    result = result.split(dev).join(num);
  }
  result = result
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return result || `album-${Date.now()}`;
}

export function generateAlbumSlug(year: number, title: string): string {
  const slug = slugifyMarathi(title);
  return `gallery/${year}/${slug}`;
}

export function isValidDriveUrl(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname.includes('drive.google.com') || u.hostname.includes('google.com');
  } catch {
    return false;
  }
}

export function shareUrl(url: string, title: string, text: string): Promise<void> {
  if (navigator.share) {
    return navigator.share({ title, text, url });
  }
  return copyToClipboard(url);
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

export function formatDate(dateString: string): string {
  return dateString;
}

export function getAlbumUrl(slug: string): string {
  const origin = window.location.origin;
  return `${origin}/${slug}`;
}

export function getDriveUrl(slug: string, driveUrl: string | null): string {
  return driveUrl || '';
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function toDevanagariNumerals(num: number | string | null | undefined): string {
  if (num === null || num === undefined) return '';
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}
