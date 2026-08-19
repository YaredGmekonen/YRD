// YRD. Technical Gallery: official angular wordmark with lime terminal dot and symbol mark.
import { useTheme } from "@/contexts/ThemeContext";

const assets = {
  dark: {
    wordmark: "/manus-storage/05_wordmark.png",
    symbol: "/manus-storage/03_symbol_mark.png",
  },
  light: {
    wordmark: "/manus-storage/06_logo_on_light.png",
    symbol: "/manus-storage/03_symbol_mark.png",
  },
} as const;

export default function BrandLogo({
  variant = "wordmark",
  className = "",
}: {
  variant?: "wordmark" | "symbol";
  className?: string;
}) {
  const { theme } = useTheme();
  return (
    <img
      className={`brand-logo brand-logo-${variant} ${className}`}
      src={assets[theme][variant]}
      alt="YRD."
    />
  );
}
