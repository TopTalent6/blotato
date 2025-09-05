export interface ModerationRequest {
  text: string;  // required input
}

export interface ModerationResult {
  flagged: boolean;
  score: number;
  reasons: string[];
  categories: Record<string, boolean>;
}

export interface Rule {
	category: string;
	regex?: RegExp;
	check?: (text: string) => boolean;
	score: number;
	reason: string;
}

export interface Categories {
  profanity: boolean;
  hateSpeech: boolean;
  violence: boolean;
  spam: boolean;
  shouting: boolean;
  repetition: boolean;
  length: boolean;
}
