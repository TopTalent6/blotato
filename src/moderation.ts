import { ModerationResult } from "./types";

export function moderateText(text: string): ModerationResult {
  let score = 0;
  const reasons: string[] = [];
  const categories: Record<string, boolean> = {};

  if (/fuck|kill|shit|bitch/i.test(text)) {
    reasons.push("Contains profanity");
    score += 40;
    categories["profanity"] = true;
  }

  return {
    flagged: score > 0,
    score,
    reasons,
    categories
  };
}
