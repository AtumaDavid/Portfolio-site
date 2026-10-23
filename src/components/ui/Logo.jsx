import { motion } from 'framer-motion';
import { SVG } from '../../lib/assets';

// The "AD" mark (public/svg/brand/logo.svg, also the favicon).
export default function Logo({ size = 32, style = {} }) {
  return (
    <motion.img
      src={SVG.logo}
      alt=""
      width={size}
      height={size}
      whileHover={{ rotate: [0, -12, 8, -4, 0], scale: 1.08, transition: { duration: 0.5 } }}
      style={{ flexShrink: 0, display: 'block', ...style }}
    />
  );
}
