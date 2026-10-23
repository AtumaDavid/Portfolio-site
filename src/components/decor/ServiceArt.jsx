import { SVG } from '../../lib/assets';

// Illustration for a "What I do" card. Artwork: public/svg/services/<kind>.svg
export default function ServiceArt({ kind }) {
  return <img src={SVG.services[kind] || SVG.services.web} alt="" width="56" height="56" style={{ display: 'block' }} />;
}
