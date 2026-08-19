import { test } from "node:test";
import { KeyboardContext, Layout, loadKeyboard } from "@keybr/keyboard";
import { act, render } from "@testing-library/react";
import { equal } from "rich-assert";
import { PointersLayer } from "./PointersLayer.tsx";
import { getKeyCenter } from "./shapes.tsx";

test("empty", (ctx) => {
  ctx.mock.timers.enable({ apis: ["setTimeout"] });

  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[]} />
    </KeyboardContext.Provider>,
  );

  act(() => {
    ctx.mock.timers.runAll();
  });

  equal(r.container.querySelectorAll("circle").length, 0);

  r.unmount();
});

test("unknown", (ctx) => {
  ctx.mock.timers.enable({ apis: ["setTimeout"] });

  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[0x0000]} />
    </KeyboardContext.Provider>,
  );

  act(() => {
    ctx.mock.timers.runAll();
  });

  equal(r.container.querySelectorAll("circle").length, 0);

  r.unmount();
});

test("without modifiers", (ctx) => {
  ctx.mock.timers.enable({ apis: ["setTimeout"] });

  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[/* "a" */ 0x0061]} />
    </KeyboardContext.Provider>,
  );

  act(() => {
    ctx.mock.timers.runAll();
  });

  equal(r.container.querySelectorAll("circle").length, 1);

  r.unmount();
});

test("with modifiers", (ctx) => {
  ctx.mock.timers.enable({ apis: ["setTimeout"] });

  const keyboard = loadKeyboard(Layout.EN_US);

  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[/* "A" */ 0x0041]} />
    </KeyboardContext.Provider>,
  );

  act(() => {
    ctx.mock.timers.runAll();
  });

  equal(r.container.querySelectorAll("circle").length, 2);

  r.unmount();
});

test("layer keys", (ctx) => {
  ctx.mock.timers.enable({ apis: ["setTimeout"] });

  const keyboard = loadKeyboard(Layout.EN_UK_MAC_LAYERS);

  // "(" lives on the Alt level of KeyJ -> point at Tab, not at an Alt key.
  const r = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[/* LEFT PARENTHESIS */ 0x0028]} />
    </KeyboardContext.Provider>,
  );
  act(() => {
    ctx.mock.timers.runAll();
  });
  equal(r.container.querySelectorAll("circle").length, 2);
  equal(
    Number(r.container.querySelectorAll("circle")[0].getAttribute("cx")),
    getKeyCenter(keyboard.getShape("Tab")!).x,
  );
  r.unmount();

  // "7" lives on the Shift+Alt level of KeyJ -> point at AltRight only (no Shift pointer).
  const r2 = render(
    <KeyboardContext.Provider value={keyboard}>
      <PointersLayer suffix={[/* DIGIT SEVEN */ 0x0037]} />
    </KeyboardContext.Provider>,
  );
  act(() => {
    ctx.mock.timers.runAll();
  });
  equal(r2.container.querySelectorAll("circle").length, 2);
  equal(
    Number(r2.container.querySelectorAll("circle")[0].getAttribute("cx")),
    getKeyCenter(keyboard.getShape("AltRight")!).x,
  );
  r2.unmount();
});
