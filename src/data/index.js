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
//   1. Create src/data/batch-25.js (words 1201-1250), etc.
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
import { WORDS_BATCH_09 } from "./batch-09.js";
import { WORDS_BATCH_10 } from "./batch-10.js";
import { WORDS_BATCH_11 } from "./batch-11.js";
import { WORDS_BATCH_12 } from "./batch-12.js";
import { WORDS_BATCH_13 } from "./batch-13.js";
import { WORDS_BATCH_14 } from "./batch-14.js";
import { WORDS_BATCH_15 } from "./batch-15.js";
import { WORDS_BATCH_16 } from "./batch-16.js";
import { WORDS_BATCH_17 } from "./batch-17.js";
import { WORDS_BATCH_18 } from "./batch-18.js";
import { WORDS_BATCH_19 } from "./batch-19.js";
import { WORDS_BATCH_20 } from "./batch-20.js";
import { WORDS_BATCH_21 } from "./batch-21.js";
import { WORDS_BATCH_22 } from "./batch-22.js";
import { WORDS_BATCH_23 } from "./batch-23.js";
import { WORDS_BATCH_24 } from "./batch-24.js";
// import { WORDS_BATCH_25 } from "./batch-25.js";

export const WORDS = [
  ...WORDS_BATCH_01,
  ...WORDS_BATCH_02,
  ...WORDS_BATCH_03,
  ...WORDS_BATCH_04,
  ...WORDS_BATCH_05,
  ...WORDS_BATCH_06,
  ...WORDS_BATCH_07,
  ...WORDS_BATCH_08,
  ...WORDS_BATCH_09,
  ...WORDS_BATCH_10,
  ...WORDS_BATCH_11,
  ...WORDS_BATCH_12,
  ...WORDS_BATCH_13,
  ...WORDS_BATCH_14,
  ...WORDS_BATCH_15,
  ...WORDS_BATCH_16,
  ...WORDS_BATCH_17,
  ...WORDS_BATCH_18,
  ...WORDS_BATCH_19,
  ...WORDS_BATCH_20,
  ...WORDS_BATCH_21,
  ...WORDS_BATCH_22,
  ...WORDS_BATCH_23,
  ...WORDS_BATCH_24,
  // ...WORDS_BATCH_25,
];
