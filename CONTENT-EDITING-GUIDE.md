# Content Editing Guide for Neighbr Website

## Quick Start

**All website content is now in one file: `content.json`**

Edit this file to change any text on the website in both English and Cantonese.

## File Location

```
/Users/ronnielee/neighbr/content.json
```

## How to Edit Content

### 1. Open the file in any text editor
- VS Code (recommended)
- Sublime Text
- Even TextEdit works!

### 2. Find the section you want to edit

The file is organized by sections:
- `navigation` - Top menu
- `hero` - Main landing section
- `valueProps` - The 3 value proposition cards
- `getStarted` - Risk-free section
- `whyNeighbr` - Onboarding timeline
- `faq` - All FAQ questions and answers
- `footer` - Bottom of page

### 3. Edit the text

Each piece of content has an English (`en`) and Cantonese (`zh`) version:

```json
{
  "title": {
    "en": "Your English Text Here",
    "zh": "你的中文內容"
  }
}
```

**To change English:** Edit the `"en"` value
**To change Cantonese:** Edit the `"zh"` value

### Example: Changing the Hero Title

**Before:**
```json
{
  "hero": {
    "title": {
      "en": "Property Management.<br><span class='highlight'>Reimagined.</span>",
      "zh": "物業管理。<br><span class='highlight'>重新定義。</span>"
    }
  }
}
```

**After:**
```json
{
  "hero": {
    "title": {
      "en": "Property Management.<br><span class='highlight'>Simplified.</span>",
      "zh": "物業管理。<br><span class='highlight'>化繁為簡。</span>"
    }
  }
}
```

## Important Rules

### ✅ DO:
- Keep the JSON structure intact (all the `{`, `}`, `[`, `]`, `:`, `,`)
- Keep quotes around text values
- Use `<br>` for line breaks
- Use `<strong>` for bold text
- Save the file after making changes

### ❌ DON'T:
- Remove quotes around text
- Remove commas between items
- Break the JSON structure
- Use special characters without escaping (use `\"` for quotes inside text)

## Special Formatting

### Line Breaks
Use `<br>` in the text:
```json
"en": "First line<br>Second line"
```

### Bold Text
Use `<strong>`:
```json
"en": "This is <strong>important</strong>"
```

### Links (in HTML sections only)
Use proper HTML:
```json
"en": "Click <a href='#section'>here</a>"
```

## Editing FAQ Questions

FAQ section has an array of questions. Each has a question and answer in both languages:

```json
{
  "question": {
    "en": "Your question in English?",
    "zh": "你的中文問題?"
  },
  "answer": {
    "en": "Your detailed answer in English.",
    "zh": "你的詳細中文答案。"
  }
}
```

## Testing Your Changes

### Option 1: Using the Current Setup (requires sync script - see below)
1. Edit `content.json`
2. Run the sync script (to be created)
3. Open `pitch.html` in browser
4. Click EN/中 toggle to test both languages

### Option 2: Direct HTML Editing (current method)
For now, continue editing `pitch.html` directly until we implement the auto-sync.

## Common Sections to Edit

### Pricing
```json
"getStarted": {
  "cards": [
    {
      "title": {
        "en": "90 Days Free",
        "zh": "免費試用90日"
      },
      "description": {
        "en": "Full platform access, then $168/month per building",
        "zh": "完整平台使用權,之後每棟每月$168"
      }
    }
  ]
}
```

### Contact Information
```json
"footer": {
  "email": {
    "en": "Email: partners@neighbr.hk",
    "zh": "電郵: partners@neighbr.hk"
  }
}
```

### Call-to-Action Buttons
```json
"hero": {
  "ctaPrimary": {
    "en": "Start Your Free 90-Day Trial →",
    "zh": "開始90日免費試用 →"
  }
}
```

## Git Workflow

After editing `content.json`:

```bash
git add content.json
git commit -m "Update website content: [describe what you changed]"
git push origin main
```

## Need Help?

If you see an error after editing:
1. Check that all quotes and commas are in place
2. Use a JSON validator: https://jsonlint.com/
3. Copy your content, paste into the validator, and it will show you any errors

## File Structure Overview

```
content.json
├── navigation (top menu)
├── hero (main banner)
├── valueProps (3 value cards)
├── getStarted (risk-free section with 5 cards)
├── whyNeighbr (onboarding timeline)
├── faq (7 question-answer pairs)
└── footer (bottom links and info)
```

---

**Pro Tip:** Always make a backup copy of `content.json` before making big changes!

**Note:** Currently, `pitch.html` still uses the old data-attribute system. We can create a script to automatically sync `content.json` to `pitch.html`, or rebuild `pitch.html` to load from this JSON file dynamically. Let me know which approach you prefer!
