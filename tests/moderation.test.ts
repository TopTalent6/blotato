import { moderateText } from "../src/moderation";

describe("Moderation Algorithm", () => {
  it("should pass safe content", () => {
    const result = moderateText("Hello everyone, hope you are doing well!");
    expect(result.flagged).toBe(false);
    expect(result.score).toBe(0);
    expect(result.reasons).toHaveLength(0);
    expect(Object.keys(result.categories).length).toBe(0);
  });

  it("should flag profanity", () => {
    const result = moderateText("You are a bitch!");
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Contains profanity");
    expect(result.categories["profanity"]).toBe(true);
  });

  it("should flag hate speech", () => {
    const result = moderateText("That guy is a nazi!");
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Contains hate speech");
    expect(result.categories["hateSpeech"]).toBe(true);
  });

  it("should flag violence/self-harm", () => {
    const result = moderateText("I want to kill myself.");
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Violence/self-harm content");
    expect(result.categories["violence"]).toBe(true);
  });

  it("should flag spammy links", () => {
    const text = "Check this http://a.com http://b.com http://c.com";
    const result = moderateText(text);
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Too many links (possible spam)");
    expect(result.categories["spam"]).toBe(true);
  });

  it("should flag shouting (all caps)", () => {
    const result = moderateText("THIS IS A TEST MESSAGE");
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("All caps shouting");
    expect(result.categories["shouting"]).toBe(true);
  });

  it("should flag repeated characters", () => {
    const result = moderateText("Helloooooo!!!!!");
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Excessive repeated characters");
    expect(result.categories["repetition"]).toBe(true);
  });

  it("should flag excessive length", () => {
    const longText = "a".repeat(1200);
    const result = moderateText(longText);
    expect(result.flagged).toBe(true);
    expect(result.reasons).toContain("Excessive length");
    expect(result.categories["length"]).toBe(true);
  });
});
