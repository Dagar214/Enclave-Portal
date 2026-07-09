import { useEffect, useState } from "react";

const LINES = [
  "$ initializing enclave-portal...",
  "[OK] zod validation active",
  "[OK] rate limiter — 5 req / 60s",
  "[OK] winston + morgan logging",
  "[OK] helmet headers enabled",
  "$ ready_",
];

function BootSequence() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisibleLines(LINES);
      setCurrentText("");
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    const typeNextChar = () => {
      if (cancelled) return;

      const line = LINES[lineIndex];

      if (charIndex <= line.length) {
        setCurrentText(line.slice(0, charIndex));
        charIndex += 1;
        setTimeout(typeNextChar, 22);
      } else {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText("");
        lineIndex += 1;
        charIndex = 0;

        if (lineIndex < LINES.length) {
          setTimeout(typeNextChar, 220);
        }
      }
    };

    const startTimer = setTimeout(typeNextChar, 300);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  return (
    <div className="boot-sequence">
      {visibleLines.map((line, index) => (
        <p
          key={index}
          className={line.startsWith("[OK]") ? "boot-line ok" : "boot-line"}
        >
          {line}
        </p>
      ))}

      {currentText && <p className="boot-line typing">{currentText}</p>}

      {visibleLines.length === LINES.length && (
        <span className="boot-cursor" />
      )}
    </div>
  );
}

export default BootSequence;