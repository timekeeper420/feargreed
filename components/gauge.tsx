import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import Counter from '@/components/counter';

interface GaugeProps {
  /**
   * The index value, ranging from 0 to 100.
   */
  index: number;
}

/**
 * A gauge component that displays a needle and a number.
 * The needle rotates from 0 to 180 degrees, where 0 represents 0 and 180 represents 100.
 * The number at the end of the needle displays the index value and changes color based on the index range.
 */
export const Gauge = ({ index }: GaugeProps) => {
  const needleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the needle's position on the gauge based on the given index.
   * The needle rotates from 0 to 180 degrees, where 0 represents 0 and 180 represents 100.
   * The number at the end of the needle displays the index value and changes color based on the index range.
   *
   * @param index - The index value, ranging from 0 to 100.
   */
  const updateNeedlePosition = (index: number) => {
    if (needleRef.current && numberRef.current) {
      const maxRotation = 180; // Maximum needle rotation (degrees)
      // Calculate rotation based on index (0-100 maps to 0-180 degrees)
      const rotation = (index / 100) * maxRotation;

      // Position the number at the end of the needle
      numberRef.current.style.transform = `rotate(-${rotation}deg)`;
      numberRef.current.textContent = index.toFixed(0);
      numberRef.current.style.backgroundColor =
        index > 75
          ? '#87d85f' // Extreme Greed
          : index > 50
            ? '#b9d85a' // Greed
            : index > 25
              ? '#daaf5a' // Fear
              : '#da805a'; // Extreme Fear
    }
  };

  useEffect(() => {
    updateNeedlePosition(index);
  }, [index]);

  return (
    <div className="gauge mt-10">
      <div className="gaugeCenter" />
      <motion.div
        ref={needleRef}
        animate={{ rotate: (index / 100) * 180 }}
        className="needle"
        initial={{ rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Counter
          ref={numberRef}
          className="number"
          options={{ maximumFractionDigits: 0 }}
          value={index}
        />
      </motion.div>
    </div>
  );
};
