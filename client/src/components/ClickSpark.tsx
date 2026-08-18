/* YRD. Technical Gallery: restrained click feedback using the signature lime signal. */
import { type CSSProperties, type MouseEvent, type ReactNode, useCallback, useEffect, useRef } from "react";

type Spark = { x: number; y: number; angle: number; startTime: number };

type ClickSparkProps = {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
};

export default function ClickSpark({ children, sparkColor = "#c6ff00", sparkSize = 9, sparkRadius = 18, sparkCount = 6, duration = 360 }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    return () => observer.disconnect();
  }, []);

  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;
      const progress = elapsed / duration;
      const eased = 1 - (1 - progress) * (1 - progress);
      const distance = eased * sparkRadius;
      const length = sparkSize * (1 - eased);
      context.strokeStyle = sparkColor;
      context.globalAlpha = 1 - progress;
      context.lineWidth = 1.5;
      context.beginPath();
      context.moveTo(spark.x + distance * Math.cos(spark.angle), spark.y + distance * Math.sin(spark.angle));
      context.lineTo(spark.x + (distance + length) * Math.cos(spark.angle), spark.y + (distance + length) * Math.sin(spark.angle));
      context.stroke();
      return true;
    });
    context.globalAlpha = 1;
    if (sparksRef.current.length) animationFrameRef.current = requestAnimationFrame(animate);
    else animationFrameRef.current = null;
  }, [duration, sparkColor, sparkRadius, sparkSize]);

  useEffect(() => () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((event.target as Element).closest(".partner-section-marquee")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({ x: event.clientX - rect.left, y: event.clientY - rect.top, angle: (Math.PI * 2 * index) / sparkCount, startTime: now })));
    if (!animationFrameRef.current) animationFrameRef.current = requestAnimationFrame(animate);
  };

  return <div className="click-spark" onClick={handleClick} style={{ position: "relative" } as CSSProperties}><canvas ref={canvasRef} className="click-spark-canvas" aria-hidden="true" />{children}</div>;
}
