import { useSpring } from 'framer-motion';
import { useMotionValue } from 'framer-motion';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Animated counter component.
 * @param value - The value to animate to.
 * @param className - The class name to apply to the span.
 */
interface CounterProps {
  value: number;
  className?: string;
  options?: Intl.NumberFormatOptions;
}

const Counter = forwardRef<HTMLSpanElement, CounterProps>(
  ({ value, className, options }: CounterProps, ref) => {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
      damping: 100,
      stiffness: 100,
    });
    const spanRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => spanRef.current!);

    useEffect(() => {
      motionValue.set(value);
    }, [motionValue, value]);

    useEffect(() => {
      motionValue.set(value);
    }, [value, motionValue]);

    useEffect(() => {
      const unsubscribe = springValue.on('change', latest => {
        if (spanRef.current) {
          spanRef.current.textContent = Intl.NumberFormat(
            'en-US',
            options,
          ).format(latest);
        }
      });

      return () => unsubscribe();
    }, [springValue, options]);

    return (
      <span ref={spanRef} className={className}>
        {Number(0).toFixed(options?.maximumFractionDigits ?? 2)}
      </span>
    );
  },
);

Counter.displayName = 'Counter';

export default Counter;
