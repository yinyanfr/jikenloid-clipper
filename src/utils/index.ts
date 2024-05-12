import { readFile, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
async function parseNotes() {
  const reader = await readFile("./notes.html");
  const dom = new JSDOM(reader.toString());
  const { document } = dom.window;
  const tbody = document.querySelector("tbody");
  const trs = tbody?.querySelectorAll("tr");
  const notes: Note[] = [];
  const note: Note = {
    id: "",
    speaker: "",
    line: "",
    notes: [],
  };
  trs?.forEach((tr) => {
    const tds = Array.from(tr.querySelectorAll("td"));
    const cell1 = tds[0].innerHTML;
    const cell2 = tds[1].innerHTML;
    if (cell1.match(/[a-z][0-9]/)) {
      notes.push({ ...note });
      note.notes = [];
      note.id = cell1;
      const speakerMatch = cell2.match(/^([^:]+):(.+)$/);
      if (speakerMatch) {
        const [, speaker, line] = speakerMatch;
        note.speaker = speaker;
        note.line = line.replace(/ /g, "，");
      } else {
        note.line = cell2;
      }
    } else {
      note.notes = cell2.split(/ /g);
    }
  });
  notes.push({ ...note });

  await writeFile("./notes.json", JSON.stringify(notes.slice(1), null, 2));
}

parseNotes();
