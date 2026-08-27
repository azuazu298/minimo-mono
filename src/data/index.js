// Combines all word batches into one list.
//
// How to add a new batch:
//   1. Create src/data/batch-02.js (copy the shape of batch-01.js).
//      Use ids 51-100 for batch 2, 101-150 for batch 3, and so on
//      (batch N uses ids (N-1)*50 + 1 ... N*50), so ids never collide.
//   2. Import it below and add it to the WORDS array.
// That's it — nothing else in the app needs to change.

import { WORDS_BATCH_01 } from "./batch-01.js";
import { WORDS_BATCH_02 } from "./batch-02.js";
// import { WORDS_BATCH_03 } from "./batch-03.js";

export const WORDS = [
  ...WORDS_BATCH_01,
  ...WORDS_BATCH_02,
  // ...WORDS_BATCH_03,
];