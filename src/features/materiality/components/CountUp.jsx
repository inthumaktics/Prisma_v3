import { useState, useEffect } from 'react';

export default function CountUp({ value, duration = 0.8, decimals = 1 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startVal = displayValue;
    const endVal = parseFloat(value);
    
    if (isNaN(endVal)) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const current = progress * (endVal - startVal) + startVal;
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value]);

  return <span className="mono">{displayValue.toFixed(decimals)}</span>;
}
