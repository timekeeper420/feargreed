import { useInView } from 'framer-motion';
import { useSpring } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

/**
 * Animated counter component.
 * @param value - The value to animate to.
 * @param className - The class name to apply to the span.
 */
interface CounterProps {
  value: number;
  className?: string;
  decimalPlaces?: number;
}

const Counter = forwardRef<HTMLSpanElement, CounterProps>(
  ({ value, className, decimalPlaces = 0 }: CounterProps, ref) => {
    const [prevValue, setPrevValue] = useState<number>(0);
    const motionValue = useMotionValue(prevValue ? value > prevValue ? 0 : value : value);
    const springValue = useSpring(motionValue, {
      damping: 100,
      stiffness: 100,
    });
    const spanRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(spanRef, { once: true, margin: '-100px' });

    useImperativeHandle(ref, () => spanRef.current!);

    useEffect(() => {
      if (isInView) {
        motionValue.set(prevValue ? value > prevValue ? 0 : value : value); // Animate up or down
        setPrevValue(value);
      }
    }, [motionValue, isInView, value, prevValue]);

    useEffect(
      () =>
        springValue.on('change', (latest) => {
          if (spanRef.current) {
            spanRef.current.textContent = Intl.NumberFormat('en-US', {
              maximumFractionDigits: decimalPlaces,
            }).format(latest);
          }
        }),
      [springValue, decimalPlaces],
    );

    return (
      <span
        ref={spanRef}
        className={className}
      >
        {Number(0).toFixed(decimalPlaces)}
      </span>
    );
  },
);

Counter.displayName = 'Counter';

export default Counter;
