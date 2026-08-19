import { type StyledText, type StyledTextSpan } from "@keybr/textinput";

type Piece = { readonly text: string; readonly cls: string | null };

/**
 * Repeats every whitespace-delimited token of a (possibly styled) text `repeat` times, so that
 * `for x in xs` becomes `for for for x x x in in in xs xs xs` — the same muscle-memory drill that
 * guided lessons get from `generateFragment(..., { repeatWords })`, for texts that are produced
 * already formatted (code). Styles are preserved per token; the original whitespace between
 * tokens is kept once after each repeated group. Stops at a token boundary once `maxLength`
 * characters have been produced (if given).
 */
export function repeatWords(
  text: StyledText,
  repeat: number,
  maxLength: number = Infinity,
): StyledText {
  if (repeat <= 1) {
    return text;
  }
  const pieces = flatten(text);
  const out: (string | StyledTextSpan)[] = [];
  let length = 0;
  let token: Piece[] = [];
  const emitToken = () => {
    if (token.length > 0) {
      for (let i = 0; i < repeat; i++) {
        if (i > 0) {
          out.push(" ");
          length += 1;
        }
        for (const { text, cls } of token) {
          out.push(cls == null ? text : { text, cls });
          length += text.length;
        }
      }
      token = [];
    }
  };
  for (const { text, cls } of pieces) {
    let start = 0;
    for (let i = 0; i <= text.length; i++) {
      const ch = i < text.length ? text.charAt(i) : "";
      const ws = ch === " " || ch === "\n" || ch === "\t";
      if (ws || ch === "") {
        if (i > start) {
          token.push({ text: text.substring(start, i), cls });
        }
        if (ws) {
          emitToken();
          if (length >= maxLength) {
            return out;
          }
          out.push(ch);
          length += 1;
        }
        start = i + 1;
      }
    }
  }
  emitToken();
  return out;
}

function flatten(
  text: StyledText,
  cls: string | null = null,
  out: Piece[] = [],
): Piece[] {
  if (typeof text === "string") {
    out.push({ text, cls });
  } else if (Array.isArray(text)) {
    for (const item of text) {
      flatten(item as StyledText, cls, out);
    }
  } else {
    const span = text as StyledTextSpan;
    out.push({ text: span.text, cls: span.cls });
  }
  return out;
}
