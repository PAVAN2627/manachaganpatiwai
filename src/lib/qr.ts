import QRCode from 'qrcode';

export async function generateQRCodeDataURL(text: string, options?: {
  width?: number;
  margin?: number;
  color?: { dark?: string; light?: string };
}): Promise<string> {
  return QRCode.toDataURL(text, {
    width: options?.width || 256,
    margin: options?.margin || 2,
    color: {
      dark: options?.color?.dark || '#7a1a1a',
      light: options?.color?.light || '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}

export async function generateQRCodeCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  options?: { width?: number; margin?: number; color?: { dark?: string; light?: string } }
): Promise<void> {
  await QRCode.toCanvas(canvas, text, {
    width: options?.width || 256,
    margin: options?.margin || 2,
    color: {
      dark: options?.color?.dark || '#7a1a1a',
      light: options?.color?.light || '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}
