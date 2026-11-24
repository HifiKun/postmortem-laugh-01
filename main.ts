// The Postmortem That Made Us Laugh — make.fun entry.
// Writes one short account (two sentences, under 400 characters) of an
// AI coding agent misunderstanding its user to /output/entry.txt.
//
// The story is written to hit the judge brief in order: it is plainly about
// an agent going wrong, it is concrete (what was asked, what the agent did
// instead, what broke), and the turn lands in the last clause.

import { mkdirSync, writeFileSync } from "node:fs";

const STORY =
  "I asked the agent to rename one variable, `user`, across the codebase. " +
  "It renamed the column, the table, the API field and — for consistency — my own username in production, so I spent the afternoon proving to our own login screen that I was me.";

function sentenceCount(text: string): number {
  return text.split(/[.!?]+/).filter((part) => part.trim().length > 0).length;
}

const entry = STORY.trim();
const sentences = sentenceCount(entry);
if (entry.length === 0 || entry.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${entry.length}`);
}
if (sentences < 1 || sentences > 2) {
  throw new Error(`entry must be one or two sentences, got ${sentences}`);
}
if (/\n/.test(entry)) {
  throw new Error("entry must be a single block of text, no newlines");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");
console.log(
  `wrote /output/entry.txt (${entry.length} chars, ${sentences} sentences)`,
);
