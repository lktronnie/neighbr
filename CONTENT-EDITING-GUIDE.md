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

**✅ Dynamic Loading is Now Active!**

1. Edit `content.json`
2. Save the file
3. Open `pitch.html` in browser (or refresh if already open)
4. Click EN/中 toggle to test both languages
5. Your changes appear instantly!

**Important:** You must view the website through a web server (not just by double-clicking the HTML file) for the JSON loading to work. Use one of these methods:

### Method 1: Python Simple Server (Recommended)
```bash
cd /Users/ronnielee/neighbr
python3 -m http.server 8000
```
Then open: http://localhost:8000/pitch.html

### Method 2: VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click `pitch.html` → "Open with Live Server"

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

## Dynamic Loading Status

**✅ Sections Using Dynamic Loading (from content.json):**
- Navigation menu (desktop and mobile)
- Hero section (badge, title, subtitle, buttons)

**⏳ Sections Still Using Old Data-Attributes:**
- Value Propositions
- Get Started
- Why Neighbr
- Challenges
- Product Features
- App Mockups
- Implementation Timeline
- Security/Trust
- Tenant Adoption Guarantee
- FAQ
- Footer

These sections will still work with the language toggle, but to edit them you currently need to update the `data-en` and `data-zh` attributes in `pitch.html` directly.

**Future Improvement:** Over time, we can migrate more sections to use `content.json` by adding their content to the JSON file and updating the HTML with `data-content-key` attributes.

---

**Pro Tip:** Always make a backup copy of `content.json` before making big changes!

**Current Status:** Dynamic loading is active for navigation and hero sections. Edit `content.json` for these sections and refresh to see changes instantly!
