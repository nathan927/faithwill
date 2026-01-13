import { useChromaKeyImage } from "@/hooks/useChromaKeyImage";
import { CSSProperties, forwardRef } from "react";

interface ChromaImageProps {
  src: string;
  alt: string;
  className?: string;
  threshold?: number;
  style?: CSSProperties;
}

/**
 * Image component with automatic white background removal
 */
export const ChromaImage = forwardRef<HTMLImageElement, ChromaImageProps>(
  ({ src, alt, className = "", threshold = 50, style }, ref) => {
    const processedSrc = useChromaKeyImage(src, { threshold });
    
    return (
      <img 
        ref={ref}
        src={processedSrc} 
        alt={alt} 
        className={className}
        style={style}
      />
    );
  }
);

ChromaImage.displayName = "ChromaImage";