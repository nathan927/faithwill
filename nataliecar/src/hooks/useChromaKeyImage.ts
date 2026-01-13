import { useEffect, useMemo, useState } from "react";

type RGB = { r: number; g: number; b: number };

// White background removal
const WHITE_KEY: RGB = { r: 255, g: 255, b: 255 };
const LIGHT_GRAY_KEY: RGB = { r: 250, g: 250, b: 250 };

const cache = new Map<string, string>();

const isNearWhite = (p: RGB, threshold: number) => {
  // Check if pixel is close to white/light gray
  return p.r >= 255 - threshold && p.g >= 255 - threshold && p.b >= 255 - threshold;
};

const keyForCache = (src: string, threshold: number) => {
  return `${src}::white::${threshold}`;
};

/**
 * Removes white/light backgrounds from images and returns a PNG data URL.
 * This is client-side only and cached per src.
 */
export const useChromaKeyImage = (
  src: string,
  options?: {
    threshold?: number; // 0-255 (default 40)
  }
) => {
  const threshold = options?.threshold ?? 40;

  const cacheKey = useMemo(() => keyForCache(src, threshold), [src, threshold]);

  const [processed, setProcessed] = useState<string>(() => cache.get(cacheKey) ?? src);

  useEffect(() => {
    const cached = cache.get(cacheKey);
    if (cached) {
      setProcessed(cached);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = src;
        });

        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No canvas context");

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;

        // Get corner pixels to determine background color
        const corners = [
          { r: d[0], g: d[1], b: d[2] }, // top-left
          { r: d[(canvas.width - 1) * 4], g: d[(canvas.width - 1) * 4 + 1], b: d[(canvas.width - 1) * 4 + 2] }, // top-right
          { r: d[(canvas.height - 1) * canvas.width * 4], g: d[(canvas.height - 1) * canvas.width * 4 + 1], b: d[(canvas.height - 1) * canvas.width * 4 + 2] }, // bottom-left
          { r: d[d.length - 4], g: d[d.length - 3], b: d[d.length - 2] }, // bottom-right
        ];

        // Check if corners are white/light
        const isWhiteBg = corners.every(c => isNearWhite(c, threshold + 20));

        if (!isWhiteBg) {
          // Not a white background, return original
          if (!cancelled) setProcessed(src);
          return;
        }

        for (let i = 0; i < d.length; i += 4) {
          const p = { r: d[i], g: d[i + 1], b: d[i + 2] };

          // Remove white/near-white pixels
          if (isNearWhite(p, threshold)) {
            d[i + 3] = 0; // Set alpha to 0
          } else {
            // Edge smoothing - partial transparency for near-white edges
            const whiteness = Math.min(p.r, p.g, p.b);
            if (whiteness > 200) {
              const alpha = Math.round((255 - whiteness) / 55 * 255);
              d[i + 3] = Math.min(d[i + 3], Math.max(alpha, 50));
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const out = canvas.toDataURL("image/png");

        cache.set(cacheKey, out);
        if (!cancelled) setProcessed(out);
      } catch {
        // Fallback to original
        if (!cancelled) setProcessed(src);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [cacheKey, src, threshold]);

  return processed;
};
