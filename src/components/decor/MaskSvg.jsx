import { motion } from 'framer-motion';

// Paints a single-colour SVG file in any colour (including CSS variables) by
// using it as a mask. By default the artwork is scaled to fit and centred
// (like an <svg> with a viewBox); `tile` repeats it at that size instead.
// Extra props go to the underlying motion.span, so it can be animated.
export default function MaskSvg({ src, color, width, height, tile, style = {}, ...rest }) {
  const mask = `url("${src}")`;
  const size = tile ? `${tile}px ${tile}px` : 'contain';
  const repeat = tile ? 'repeat' : 'no-repeat';
  const position = tile ? '0 0' : 'center';
  return (
    <motion.span
      aria-hidden="true"
      {...rest}
      style={{
        display: 'block',
        width,
        height,
        background: color,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: size,
        maskSize: size,
        WebkitMaskRepeat: repeat,
        maskRepeat: repeat,
        WebkitMaskPosition: position,
        maskPosition: position,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
