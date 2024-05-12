import notes from "../utils/notes.json";

export function formatNote() {
  const formattedNotes: FormattedNote[] = [];
  notes.forEach((note: Note) => {
    const { id, line, notes } = note;
    const formatted: Formatted[] = [];
    if (notes.length) {
      const copiedNotes = [...notes];
      line.split("").forEach((word) => {
        if (word.match(/[，?？!！. ]/)) {
          formatted.push({
            word,
            note: "",
          });
        } else {
          const note = copiedNotes.shift();
          formatted.push({
            word,
            note: `"${note} ${id}"`,
          });
        }
      });
    }
    formattedNotes.push({
      ...note,
      formatted,
    });
  });
  return formattedNotes;
}
