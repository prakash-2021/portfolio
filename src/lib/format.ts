export function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** Copy with `[TODO: …]` placeholders removed, for metadata and other plain-text outputs. */
export function stripTodos(text: string) {
  return text.replace(/\s*\[TODO:[^\]]*\]/g, "").trim();
}
