# Blotato 🥔

A lightweight, fast, and customizable text moderation API built with TypeScript and Express.js. Blotato helps you automatically detect and flag inappropriate content including profanity, hate speech, violence, spam, and other unwanted text patterns.

## Features

- **Multiple Detection Categories**: Profanity, hate speech, violence/self-harm, spam, shouting, repetition, and excessive length
- **Scoring System**: Each violation gets a weighted score for nuanced moderation decisions
- **RESTful API**: Simple HTTP endpoint for easy integration
- **TypeScript**: Full type safety and excellent developer experience
- **Extensible**: Easy to add custom rules and categories
- **Lightweight**: Minimal dependencies, fast response times

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/TopTalent6/blotato.git
cd blotato

# Install dependencies
npm install
```

### Development

```bash
# Run in development mode with hot reload
npm run dev
```

### Production

```bash
# Build the project
npm run build

# Start the production server
npm start
```

The API will be available at `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Usage

### POST /check

Moderates text content and returns a detailed analysis.

**Request:**
```json
{
  "text": "Your text content to moderate"
}
```

**Response:**
```json
{
  "flagged": true,
  "score": 40,
  "reasons": ["Contains profanity"],
  "categories": {
    "profanity": true
  }
}
```

### Example Usage

```bash
# Using curl
curl -X POST http://localhost:3000/check \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'

# Using JavaScript fetch
const response = await fetch('http://localhost:3000/check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Your message here'
  })
});

const result = await response.json();
console.log(result);
```

## Moderation Categories

| Category | Description | Score Weight | Examples |
|----------|-------------|--------------|----------|
| **Profanity** | Common swear words and offensive language | 40 | f*ck, sh*t, b*tch |
| **Hate Speech** | Discriminatory or hateful content | 50 | nazi, terrorist |
| **Violence** | Violent or self-harm content | 50 | kill, suicide |
| **Spam** | Multiple links or promotional content | 20 | 3+ URLs in text |
| **Shouting** | All caps text (10+ characters) | 10 | "THIS IS SHOUTING" |
| **Repetition** | Excessive repeated characters | 10 | "Helloooooo!!!!!" |
| **Length** | Excessively long messages | 10 | 1000+ characters |

## Response Format

```typescript
interface ModerationResult {
  flagged: boolean;           // Whether content should be flagged
  score: number;              // Total moderation score
  reasons: string[];          // Human-readable reasons for flagging
  categories: Record<string, boolean>; // Which categories were triggered
}
```

## Configuration

The moderation rules are defined in `src/rules.ts` and can be easily customized:

```typescript
export const rules: Rule[] = [
  { 
    category: "profanity", 
    regex: /\b(badword1|badword2)\b/i, 
    score: 40, 
    reason: "Contains profanity" 
  },
  { 
    category: "spam", 
    check: text => (text.match(/https?:\/\//g) || []).length > 2, 
    score: 20, 
    reason: "Too many links" 
  },
  // Add your custom rules here
];
```

## Development

### Project Structure

```
blotato/
├── src/
│   ├── index.ts          # Express server and API routes
│   ├── moderation.ts     # Core moderation logic
│   ├── rules.ts          # Moderation rules configuration
│   └── types.ts          # TypeScript type definitions
├── tests/
│   └── moderation.test.ts # Test suite
├── package.json
├── tsconfig.json
└── README.md
```

### Running Tests

```bash
npm test
```

### Adding Custom Rules

1. Define your rule in `src/rules.ts`
2. Add the category to the `Categories` interface in `src/types.ts`
3. Write tests in `tests/moderation.test.ts`

## Environment Variables

- `PORT`: Server port (default: 3000)

