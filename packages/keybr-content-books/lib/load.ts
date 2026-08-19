import { Book, type Content } from "@keybr/content";

/** Fetches a "local book" (see Book.LOCAL_*) from the server; explains itself when the file is missing. */
async function loadLocal(book: Book, url: string): Promise<Content> {
  try {
    const response = await fetch(url, { cache: "no-cache" });
    if (response.ok) {
      const content = (await response.json()) as Content;
      if (Array.isArray(content) && content.length > 0) {
        return content;
      }
    }
  } catch {
    // fall through to the placeholder
  }
  return [
    [
      book.title,
      [
        `No local book was found at ${url}. Put a JSON file there with the shape ` +
          `[[chapter title, [paragraph, ...]], ...] (pdf-to-book.py makes one from a PDF) and reload.`,
      ],
    ],
  ];
}

export async function loadContent(book: Book): Promise<Content> {
  switch (book) {
    case Book.EN_ALICE_WONDERLAND:
      return (
        await import(
          /* webpackChunkName: "book-en-alice-wonderland" */
          "./data/en-alice-wonderland.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.EN_JEKYLL_HYDE:
      return (
        await import(
          /* webpackChunkName: "book-en-jekyll-hyde" */
          "./data/en-jekyll-hyde.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.EN_CALL_WILD:
      return (
        await import(
          /* webpackChunkName: "book-en-call-wild" */
          "./data/en-call-wild.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.EN_TAB_LAYER:
      return (
        await import(
          /* webpackChunkName: "book-en-tab-layer" */
          "./data/en-tab-layer.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.EN_BUILD_A_GPT:
      return (
        await import(
          /* webpackChunkName: "book-en-build-a-gpt" */
          "./data/en-build-a-gpt.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.LOCAL_1:
      return await loadLocal(book, "/local-books/1.json");
    case Book.LOCAL_2:
      return await loadLocal(book, "/local-books/2.json");
    case Book.LOCAL_3:
      return await loadLocal(book, "/local-books/3.json");
    case Book.ES_MARIANELA:
      return (
        await import(
          /* webpackChunkName: "book-es-marianela" */
          "./data/es-marianela.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.DE_ALICE_WONDERLAND:
      return (
        await import(
          /* webpackChunkName: "book-de-alice-wonderland" */
          "./data/de-alice-wonderland.json",
          { with: { type: "json" } }
        )
      ).default as any;
    case Book.FR_ALICE_WONDERLAND:
      return (
        await import(
          /* webpackChunkName: "book-fr-alice-wonderland" */
          "./data/fr-alice-wonderland.json",
          { with: { type: "json" } }
        )
      ).default as any;
    default:
      throw new Error();
  }
}
