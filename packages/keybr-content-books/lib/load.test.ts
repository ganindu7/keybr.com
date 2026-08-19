import { test } from "node:test";
import { Book } from "@keybr/content";
import { equal, isTrue } from "rich-assert";
import { loadContent } from "./load.ts";

test("local book falls back to a placeholder when the file is missing", async () => {
  const content = await loadContent(Book.LOCAL_1);
  equal(content.length, 1);
  equal(content[0][0], "Local book 1");
  isTrue(content[0][1][0].includes("/local-books/1.json"));
});
