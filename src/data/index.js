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
//   1. Create src/data/batch-05.js (words 201-250), etc.
//      Batch N uses ids (N-1)*50 + 1 ... N*50, so ids never collide.
//   2. Import it below and add it to the WORDS array.
// That's it — nothing else in the app needs to change.

import { WORDS_BATCH_01 } from "./batch-01.js";
import { WORDS_BATCH_02 } from "./batch-02.js";
import { WORDS_BATCH_03 } from "./batch-03.js";
import { WORDS_BATCH_04 } from "./batch-04.js";
// import { WORDS_BATCH_05 } from "./batch-05.js";

export const WORDS = [
  ...WORDS_BATCH_01,
  ...WORDS_BATCH_02,
  ...WORDS_BATCH_03,
  ...WORDS_BATCH_04,
  // ...WORDS_BATCH_05,
];
