// Combines all word batches into one list.
//
// Data shape each batch file must export (new format):
//   {
//     id, word, meaning, difficulty,
//     corrects: ["...", "...", "..."],       // exactly 3
//     wrongs:   ["...", "...", "...", "...", "..."], // exactly 5
//   }
//
// How to add a new batch:
//   1. Create src/data/batch-09.js (words 401-450), etc.
//      Batch N uses ids (N-1)*50 + 1 ... N*50, so ids never collide.
//   2. Import it below and add it to the WORDS array.
// That's it — nothing else in the app needs to change.

import { WORDS_BATCH_01 } from "./batch-01.js";
import { WORDS_BATCH_02 } from "./batch-02.js";
import { WORDS_BATCH_03 } from "./batch-03.js";
import { WORDS_BATCH_04 } from "./batch-04.js";
import { WORDS_BATCH_05 } from "./batch-05.js";
import { WORDS_BATCH_06 } from "./batch-06.js";
import { WORDS_BATCH_07 } from "./batch-07.js";
import { WORDS_BATCH_08 } from "./batch-08.js";
// import { WORDS_BATCH_09 } from "./batch-09.js";

export const WORDS = [
  ...WORDS_BATCH_01,
  ...WORDS_BATCH_02,
  ...WORDS_BATCH_03,
  ...WORDS_BATCH_04,
  ...WORDS_BATCH_05,
  ...WORDS_BATCH_06,
  ...WORDS_BATCH_07,
  ...WORDS_BATCH_08,
  // ...WORDS_BATCH_09,
];
