import { Reveal, PopWords } from './Motion';
import Note from './Note';

// Standard section intro: handwritten note, popping headline, optional lede.
// Wrap the highlighted word(s) of `title` in [brackets]. Extra decoration
// (e.g. a Squiggle) goes in children.
export default function SectionHeader({ note, title, lede, children }) {
  return (
    <Reveal>
      <div className="section-head">
        {note && <Note>{note}</Note>}
        <PopWords text={title} className="headline h2" />
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </Reveal>
  );
}
