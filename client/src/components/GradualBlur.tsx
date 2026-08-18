/* YRD. Technical Gallery: an edge-only transition treatment for moving partner records. */
type GradualBlurProps = {
  target?: "parent" | "page";
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: "linear" | "bezier";
  exponential?: boolean;
  opacity?: number;
  className?: string;
};

export default function GradualBlur({ target = "parent", position = "bottom", height = "6rem", strength = 2, divCount = 5, curve = "bezier", exponential = true, opacity = 1, className = "" }: GradualBlurProps) {
  const isHorizontal = position === "top" || position === "bottom";
  const placement = position === "top" ? { top: 0, left: 0, right: 0, height } : position === "bottom" ? { bottom: 0, left: 0, right: 0, height } : position === "left" ? { left: 0, top: 0, bottom: 0, width: height } : { right: 0, top: 0, bottom: 0, width: height };
  const direction = position === "bottom" ? "to top" : position === "top" ? "to bottom" : position === "left" ? "to right" : "to left";
  return (
    <div className={`gradual-blur gradual-blur-${position} ${className}`} data-target={target} style={{ position: target === "page" ? "fixed" : "absolute", zIndex: 2, pointerEvents: "none", overflow: "hidden", ...placement }} aria-hidden="true">
      {Array.from({ length: divCount }, (_, index) => {
        const ratio = (index + 1) / divCount;
        const intensity = exponential ? ratio * ratio : ratio;
        const stop = curve === "bezier" ? `${Math.round(intensity * 78)}%` : `${Math.round(ratio * 80)}%`;
        return <span key={index} style={{ position: "absolute", inset: 0, backdropFilter: `blur(${(intensity * strength).toFixed(2)}px)`, WebkitBackdropFilter: `blur(${(intensity * strength).toFixed(2)}px)`, maskImage: `linear-gradient(${direction}, transparent 0%, black ${stop}, black 100%)`, WebkitMaskImage: `linear-gradient(${direction}, transparent 0%, black ${stop}, black 100%)`, opacity: opacity * (0.2 + ratio * 0.8) }} />;
      })}
    </div>
  );
}
