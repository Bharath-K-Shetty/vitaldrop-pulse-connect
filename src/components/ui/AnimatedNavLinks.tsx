import { useRef, useState, useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/Dashboard" },
  { name: "Communities", path: "/Communities" },
  { name: "Emergency", path: "/Emergency" },
  { name: "Profile", path: "/Profile" },
];

export const AnimatedNavLinks = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoverStyle, setHoverStyle] = useState<{ left: number; width: number } | null>(null);
  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const moveIndicatorToIndex = (index: number) => {
    if (!containerRef.current) return;

    const anchors = containerRef.current.querySelectorAll("a");
    const target = anchors[index] as HTMLElement;
    if (!target) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const left = targetRect.left - containerRect.left;
    const width = targetRect.width;

    setHoverStyle({ left, width });
    setVisible(true);
  };

  const handleMouseEnter = (index: number) => {
    moveIndicatorToIndex(index);
  };

  const handleMouseLeave = () => {
    // Don't reset position; just fade out
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => setHasMounted(true), 10);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative hidden md:flex md:ml-8 md:space-x-6"
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute bottom-0 h-9 bg-red-600 rounded-3xl z-0 pointer-events-none"
        style={{
          transform: hoverStyle
            ? `translateX(${hoverStyle.left}px)`
            : "translateX(0)",
          width: hoverStyle ? `${hoverStyle.width}px` : "0px",
          opacity: visible ? 1 : 0,
          transition: hasMounted ? "all 300ms ease-in-out" : "none",
          willChange: "transform, width, opacity",
        }}
      />
      {navLinks.map((link, index) => (
        <a
          key={link.name}
          href={link.path}
          onMouseEnter={() => handleMouseEnter(index)}
          className="relative z-10 px-4 py-2 text-sm font-medium text-gray-800 hover:text-white transition-colors duration-300"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};
