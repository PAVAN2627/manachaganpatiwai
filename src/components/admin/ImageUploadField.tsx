import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
}

// Compress image via canvas to keep Base64 size well under Firestore document limit (~50-100KB)
async function compressImage(file: File, maxWidth = 1000, maxHeight = 1000, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = 'https://... किंवा छायाचित्र अपलोड करा',
  helperText = 'Firebase Storage नसले तरी हे छायाचित्र थेट Firestore मध्ये सुरक्षित साठवले जाईल.',
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [compressing, setCompressing] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate that it is an image
    if (!file.type.startsWith('image/')) {
      alert('कृपया वैध छायाचित्र फाइल निवडा (JPG, PNG, WebP).');
      return;
    }

    try {
      setCompressing(true);
      const base64 = await compressImage(file);
      onChange(base64);
    } catch (err) {
      console.error('Image compression failed:', err);
      alert('छायाचित्र प्रक्रिया करताना त्रुटी आली. कृपया दुसरी फाइल निवडा.');
    } finally {
      setCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isBase64 = value?.startsWith('data:image/');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-devanagari-sans text-dark-maroon/80 font-medium">
          {label}
        </label>
        <div className="flex items-center gap-2 text-xs font-devanagari-sans">
          <button
            type="button"
            onClick={() => setUploadMode('upload')}
            className={`px-2 py-0.5 rounded transition-all ${
              uploadMode === 'upload'
                ? 'bg-saffron text-cream font-semibold'
                : 'text-dark-maroon/60 hover:text-dark-maroon'
            }`}
          >
            अपलोड करा
          </button>
          <span className="text-dark-maroon/30">|</span>
          <button
            type="button"
            onClick={() => setUploadMode('url')}
            className={`px-2 py-0.5 rounded transition-all ${
              uploadMode === 'url'
                ? 'bg-saffron text-cream font-semibold'
                : 'text-dark-maroon/60 hover:text-dark-maroon'
            }`}
          >
            URL टाका
          </button>
        </div>
      </div>

      {uploadMode === 'upload' ? (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <div className="flex gap-2 items-center">
            <button
              type="button"
              disabled={compressing}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-lg bg-golden/15 hover:bg-golden/25 text-dark-maroon font-devanagari-sans font-medium text-sm border border-golden/40 transition-all flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4 text-saffron" />
              <span>{compressing ? 'छायाचित्र प्रोसेस होत आहे...' : 'छायाचित्र निवडा (Upload File)'}</span>
            </button>
            {value && (
              <span className="text-xs text-green-700 font-devanagari-sans flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>{isBase64 ? 'छायाचित्र तयार (Firestore Ready)' : 'URL लिंक जोडली'}</span>
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-maroon/40" />
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-golden/30 bg-white/50 text-dark-maroon text-sm focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron"
          />
        </div>
      )}

      {/* Image Preview & Remove */}
      {value ? (
        <div className="mt-2 relative inline-block rounded-xl border border-golden/40 overflow-hidden bg-cream/40 p-1 shadow-sm">
          <div className="relative max-h-36 max-w-xs overflow-hidden rounded-lg">
            <img
              src={value}
              alt="Preview"
              className="w-full h-auto max-h-36 object-cover rounded-lg"
              onError={(e) => {
                // If invalid URL, show broken image styling gracefully
                (e.target as HTMLImageElement).src = '/waiganpatilogo.png';
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow transition-all"
            title="छायाचित्र काढून टाका"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <p className="text-xs text-dark-maroon/50 font-devanagari-sans">
          {helperText}
        </p>
      )}
    </div>
  );
}
