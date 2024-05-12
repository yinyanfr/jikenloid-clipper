interface Note {
  id: string;
  speaker: string;
  line: string;
  notes: string[];
}

interface Formatted {
  word: string;
  note: string;
}

type FormattedNote = Note & {
  formatted: Formatted[];
};
