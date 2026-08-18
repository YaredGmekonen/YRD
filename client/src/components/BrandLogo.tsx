// YRD. Technical Gallery v2: the supplied official wordmark and symbol assets swap cleanly with the active color mode.
import { useTheme } from "@/contexts/ThemeContext";

const assets = {
  dark: { wordmark: "/manus-storage/yrd-wordmark-dark_c6cdcc1a.png", symbol: "/manus-storage/yrd-symbol-dark_94c94417.png" },
  light: { wordmark: "/manus-storage/yrd-wordmark-light_1a104d34.png", symbol: "/manus-storage/yrd-symbol-light_60760a53.png" },
} as const;

export default function BrandLogo({ variant = "wordmark", className = "" }: { variant?: "wordmark" | "symbol"; className?: string }) {
  const { theme } = useTheme();
  return <img className={`brand-logo brand-logo-${variant} ${className}`} src={assets[theme][variant]} alt="YRD." />;
}
