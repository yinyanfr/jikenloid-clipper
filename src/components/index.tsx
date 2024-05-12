import { message } from "antd";
import { type ClipboardEvent, useId } from "react";

export function CopiableLine({ note }: { note: FormattedNote }) {
  const keyId = useId();
  const { id, formatted, line } = note;

  const handleCopy = (e: ClipboardEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const selection = document.getSelection();
    if (selection) {
      const { anchorNode, focusNode } = selection;
      const { index: startIndex } = anchorNode?.parentElement?.dataset ?? {};
      const { index: endIndex } = focusNode?.parentElement?.dataset ?? {};
      if (startIndex !== undefined && endIndex !== undefined) {
        const start = parseInt(startIndex);
        const end = parseInt(endIndex);
        const slicedNotes = [...formatted].slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        const notes = slicedNotes.map((e) => e.note).join("");
        e.clipboardData.setData("text/plain", notes);
        message.success(`已成功复制：${notes}`);
      }
    }
  };

  if (formatted.length)
    return (
      <span onCopy={handleCopy}>
        {formatted.map((formattedNote, index) => (
          <span key={`${keyId}-${id}-${index}`} data-index={index}>
            {formattedNote.word}
          </span>
        ))}
      </span>
    );

  return <span className="non-select">{line}</span>;
}
