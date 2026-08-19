import { Language } from "@keybr/keyboard";
import { Enum, type EnumItem } from "@keybr/lang";
import coverImageEnAliceWonderland from "../../assets/cover-image-en-alice-wonderland.jpg";
import coverImageEnBuildAGpt from "../../assets/cover-image-en-build-a-gpt.jpg";
import coverImageEnCallWild from "../../assets/cover-image-en-call-wild.jpg";
import coverImageEnJekyllHyde from "../../assets/cover-image-en-jekyll-hyde.jpg";
import coverImageEnTabLayer from "../../assets/cover-image-en-tab-layer.jpg";
import coverImageEsMarianela from "../../assets/cover-image-es-marianela.jpg";
import coverImageFrAliceWonderland from "../../assets/cover-image-fr-alice-wonderland.jpg";

export class Book implements EnumItem {
  static readonly EN_ALICE_WONDERLAND = new Book(
    /* id= */ "en-alice-wonderland",
    /* language= */ Language.EN,
    /* title= */ "Alice’s Adventures in Wonderland",
    /* author= */ "Lewis Carroll",
    /* coverImage= */ coverImageEnAliceWonderland,
  );
  static readonly EN_JEKYLL_HYDE = new Book(
    /* id= */ "en-jekyll-hyde",
    /* language= */ Language.EN,
    /* title= */ "The Strange Case Of Dr. Jekyll And Mr. Hyde",
    /* author= */ "Robert Louis Stevenson",
    /* coverImage= */ coverImageEnJekyllHyde,
  );
  static readonly EN_CALL_WILD = new Book(
    /* id= */ "en-call-wild",
    /* language= */ Language.EN,
    /* title= */ "The Call of the Wild",
    /* author= */ "Jack London",
    /* coverImage= */ coverImageEnCallWild,
  );
  static readonly EN_TAB_LAYER = new Book(
    /* id= */ "en-tab-layer",
    /* language= */ Language.EN,
    /* title= */ "The Tab Layer: a practice book for coders",
    /* author= */ "Ganindu Nanayakkara",
    /* coverImage= */ coverImageEnTabLayer,
  );
  static readonly EN_BUILD_A_GPT = new Book(
    /* id= */ "en-build-a-gpt",
    /* language= */ Language.EN,
    /* title= */ "Build a GPT: micrograd and nanoGPT, line by line",
    /* author= */ "Andrej Karpathy (MIT)",
    /* coverImage= */ coverImageEnBuildAGpt,
  );
  static readonly ES_MARIANELA = new Book(
    /* id= */ "es-marianela",
    /* language= */ Language.ES,
    /* title= */ "Marianela",
    /* author= */ "Benito Pérez Galdós",
    /* coverImage= */ coverImageEsMarianela,
  );
  static readonly DE_ALICE_WONDERLAND = new Book(
    /* id= */ "de-alice-wonderland",
    /* language= */ Language.DE,
    /* title= */ "Alice’s Abenteuer im Wunderland",
    /* author= */ "Lewis Carroll, Antonie Zimmermann",
    /* coverImage= */ coverImageEnAliceWonderland,
  );
  static readonly FR_ALICE_WONDERLAND = new Book(
    /* id= */ "fr-alice-wonderland",
    /* language= */ Language.FR,
    /* title= */ "Aventures D’Alice Au Pays Des Merveilles",
    /* author= */ "Lewis Carroll, Henri Bué",
    /* coverImage= */ coverImageFrAliceWonderland,
  );

  static readonly ALL = new Enum<Book>(
    Book.EN_ALICE_WONDERLAND,
    Book.EN_JEKYLL_HYDE,
    Book.EN_CALL_WILD,
    Book.EN_TAB_LAYER,
    Book.EN_BUILD_A_GPT,
    Book.ES_MARIANELA,
    Book.DE_ALICE_WONDERLAND,
    Book.FR_ALICE_WONDERLAND,
  );

  private constructor(
    readonly id: string,
    readonly language: Language,
    readonly title: string,
    readonly author: string,
    readonly coverImage: string,
  ) {
    Object.freeze(this);
  }

  toString() {
    return this.id;
  }

  toJSON() {
    return this.id;
  }
}
