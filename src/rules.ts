import { Rule } from "./types";

export const rules: Rule[] = [
  { category: "profanity", regex: /\b(fuck|shit|bitch)\b/i, score: 40, reason: "Contains profanity" },
  { category: "hateSpeech", regex: /\b(nazi|terrorist)\b/i, score: 50, reason: "Contains hate speech" },
  { category: "violence", regex: /\b(kill|suicide)\b/i, score: 50, reason: "Violence/self-harm content" },
  { category: "spam", check: text => (text.match(/https?:\/\//g) || []).length > 2, score: 20, reason: "Too many links" },
  { category: "shouting", check: text => text.length > 10 && text === text.toUpperCase(), score: 10, reason: "All caps shouting" },
  { category: "repetition", regex: /(.)\1{4,}/, score: 10, reason: "Excessive repeated characters" },
  { category: "length", check: text => text.length > 1000, score: 10, reason: "Excessive length" },
];
