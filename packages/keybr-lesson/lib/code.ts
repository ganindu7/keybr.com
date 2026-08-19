import { type Keyboard } from "@keybr/keyboard";
import { Letter, type PhoneticModel } from "@keybr/phonetic-model";
import { type RNGStream } from "@keybr/rand";
import { type KeyStatsMap } from "@keybr/result";
import { type Settings } from "@keybr/settings";
import { LessonKeys } from "./key.ts";
import { Lesson } from "./lesson.ts";
import { lessonProps } from "./settings.ts";
import { Target } from "./target.ts";
import { repeatWords } from "./text/repeat.ts";

export class CodeLesson extends Lesson {
  constructor(settings: Settings, keyboard: Keyboard, model: PhoneticModel) {
    super(settings, keyboard, model);
  }

  override get letters(): readonly Letter[] {
    return Letter.programming;
  }

  override update(keyStatsMap: KeyStatsMap) {
    return LessonKeys.includeAll(keyStatsMap, new Target(this.settings));
  }

  override generate(lessonKeys: LessonKeys, rng: RNGStream) {
    const syntax = this.settings.get(lessonProps.code.syntax);
    const flags = this.settings.get(lessonProps.code.flags);
    const text = syntax.generate(new Set(flags), rng);
    const repeat = this.settings.get(lessonProps.repeatWords);
    if (repeat > 1) {
      const length =
        100 + Math.round(this.settings.get(lessonProps.length) * 100);
      return repeatWords(text, repeat, length * repeat);
    }
    return text;
  }
}
