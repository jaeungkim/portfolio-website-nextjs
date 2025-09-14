import { motion } from "motion/react";

interface FloatingHeartProps {
  size?: number;
  color?: string;
  opacity?: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animation: {
    y: number[];
    x?: number[];
    rotate?: number[];
    duration: number;
    delay?: number;
  };
}

const HeartIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function FloatingHeart({
  size = 24,
  color = "#5F89B8",
  opacity = 1,
  position,
  animation,
}: FloatingHeartProps) {
  return (
    <motion.div
      className={`absolute ${position.top ? `top-${position.top}` : ""} ${
        position.bottom ? `bottom-${position.bottom}` : ""
      } ${position.left ? `left-${position.left}` : ""} ${
        position.right ? `right-${position.right}` : ""
      }`}
      style={{
        opacity,
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      }}
      animate={{
        y: animation.y,
        ...(animation.x && { x: animation.x }),
        ...(animation.rotate && { rotate: animation.rotate }),
      }}
      transition={{
        duration: animation.duration,
        repeat: Infinity,
        ease: "easeInOut",
        ...(animation.delay && { delay: animation.delay }),
      }}
    >
      <HeartIcon size={size} color={color} />
    </motion.div>
  );
}
