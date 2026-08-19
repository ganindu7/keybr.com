import { test } from "node:test";
import { deepEqual, equal } from "rich-assert";
import { repeatWords } from "./repeat.ts";

test("repeat plain words", () => {
  equal(repeatWords("for x in xs", 1), "for x in xs");
  deepEqual(repeatWords("for x in xs", 2), [
    "for",
    " ",
    "for",
    " ",
    "x",
    " ",
    "x",
    " ",
    "in",
    " ",
    "in",
    " ",
    "xs",
    " ",
    "xs",
  ]);
});

test("repeat styled words, keep styles and separators", () => {
  deepEqual(
    repeatWords(
      [
        { text: "if", cls: "kw" },
        " ",
        "(",
        { text: "x", cls: "id" },
        ")",
        "\n",
      ],
      2,
    ),
    [
      { text: "if", cls: "kw" },
      " ",
      { text: "if", cls: "kw" },
      " ",
      "(",
      { text: "x", cls: "id" },
      ")",
      " ",
      "(",
      { text: "x", cls: "id" },
      ")",
      "\n",
    ],
  );
});

test("stop at a token boundary after maxLength", () => {
  deepEqual(repeatWords("aa bb cc", 2, 5), ["aa", " ", "aa"]);
});
