# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neighbr is a comprehensive property management platform for Hong Kong residential buildings designed to build vibrant communities within estates. The platform helps estates feel more together and premium while improving quality of life for residents.

### Current Phase: Pilot Testing Onboarding
The immediate goal is to onboard buildings to start pilot testing through the marketing website (`pitch.html`).

### Core Features:
- **Facility Booking**: Tenants can reserve shared facilities (clubhouse, gym, BBQ areas, etc.)
- **Maintenance Reporting**: Submit and track maintenance issues with photo uploads
- **Management Communication**: Property managers can broadcast announcements and updates to all tenants
- **Community Building**: Residents can communicate with neighbors, organize events, and foster neighborhood connections
- **Building Directory**: Search and view building information with ratings

### Ultimate Vision:
Create a sense of community within each estate, making residents feel connected, improving the premium feel of the property, and enhancing overall quality of life.

The project includes:
- **Marketing Website** (`pitch.html`) - Bilingual landing page for pilot onboarding
- **Next.js Web Application** - Main platform (in development)
- **PostgreSQL Database** - Data storage
- **Python Scripts** - Building data enrichment from Hong Kong government APIs

## Tech Stack

### Marketing Website (pitch.html)
- **Static HTML/CSS/JavaScript** - Single-page landing site for pilot onboarding
- **Bilingual Support** - English/Traditional Chinese (Cantonese) with language toggle
- **Dynamic Content Loading** - Content managed via `content.json` for easy editing
- **Responsive Design** - Mobile-friendly with hamburger menu

### Main Application (Next.js)
- **Frontend**: Next.js 14 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Backend**: Next.js API Routes, PostgreSQL with `pg` driver
- **APIs**: Google Maps Places API, Hong Kong government data APIs (data.gov.hk, HAD services)
- **Data Processing**: Python scripts using pandas, requests, xml parsing

## Development Commands

### Marketing Website (pitch.html)

```bash
# Start local server for testing
cd /Users/ronnielee/neighbr
python3 -m http.server 8000
# Then open: http://localhost:8000/pitch.html
```

**Content Editing:**
- Edit `content.json` to update bilingual content (navigation and hero sections use dynamic loading)
- Other sections use `data-en` and `data-zh` attributes in `pitch.html`
- See `README-FOR-CONTENT-EDITORS.md` for non-technical editing guide
- See `CONTENT-EDITING-GUIDE.md` for detailed technical documentation

### Next.js Application

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

### Database Setup

```bash
# Create database
createdb neighbr

# Initialize schema and seed data
psql -d neighbr -f schema.sql
```

### Python Data Scripts

The Python scripts are standalone utilities for data scraping and enrichment:

- `scrape_buildings.py` - Fetches building data from data.gov.hk Names of Buildings XML dataset
- `enrich_100_test.py` - Enriches building data with HAD (Home Affairs Department) API data
- `enrich_local_match.py` - Matches building records locally
- `scrape_had_households.py` - Scrapes household data from HAD services
- Other inspection/utility scripts for exploring HAD API endpoints

Run with: `python <script_name>.py`

## Architecture

### Data Flow

**Building Search** (existing legacy feature):
1. User Search → `AddressSearch.tsx` (Google Maps autocomplete) → submits address + placeId
2. Results Fetch → `/api/properties` GET endpoint → PostgreSQL ILIKE query on address field
3. Display → `app/results/page.tsx` renders `PropertyCard` components

**Property Management Features** (planned):
1. **Facility Booking**: User selects facility → checks availability → creates booking → confirms via email/notification
2. **Maintenance Reports**: User submits issue with photos → manager receives notification → updates status → tenant notified
3. **Communications**: Manager posts announcement → all tenants in building receive notification → view in feed
4. **Community**: Tenants post in building forum → other residents can comment/like → fosters neighborhood connections

### Key Components

**Database Layer** (`lib/db.ts`)
- Singleton pattern for PostgreSQL connection pooling
- `getPool()` creates/returns a single Pool instance
- `query(text, params)` executes parameterized queries safely

**API Routes** (`app/api/properties/route.ts`)
- GET: Search properties by address (ILIKE pattern matching, ordered by rating DESC, limited to 20 results)
- POST: Insert new properties (for bulk data import from Python scripts)
- Validation: Ensures rating is 0-5, address is required

**Client Components**
- `AddressSearch.tsx`: Google Maps Autocomplete wrapper, restricted to US addresses (`componentRestrictions: { country: 'us' }`)
- `PropertyCard.tsx`: Displays individual property with rating stars

### Data Schema

The `properties` table has:
- Text fields: `address` (indexed), `city`, `state`, `zip_code`
- Numeric fields: `latitude`, `longitude` (composite index), `rating` (0-5 CHECK constraint)
- Timestamps: `created_at`, `updated_at`

### Type Definitions

All TypeScript types are centralized in `types/index.ts`:
- `Property` interface matches database schema
- `SearchResult` wraps API responses

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key with Places API enabled (exposed to browser)
- `DATABASE_URL` - PostgreSQL connection string (server-side only)

## Data Enrichment Workflow

The Python scripts follow this pattern:
1. Scrape raw building data from data.gov.hk XML API
2. Query Hong Kong government HAD/CSDI FeatureServer APIs to enrich with unit counts, household data
3. Match records using building names and addresses (case-insensitive, LIKE queries)
4. Export enriched CSVs that can be bulk-imported via POST `/api/properties`

HAD API endpoints use ArcGIS FeatureServer format with SQL-like WHERE clauses.

## Common Tasks

### Adding scraped data to database

After running Python scripts to generate enriched CSVs, bulk insert via:
```bash
# Convert CSV to SQL INSERT statements or use a script to POST to /api/properties
```

Or use the POST endpoint programmatically from Python:
```python
import requests
data = {'address': '...', 'rating': 4.5, 'latitude': 22.28, 'longitude': 114.15, ...}
requests.post('http://localhost:3000/api/properties', json=data)
```

### Updating search logic

The search is currently a simple ILIKE pattern match in `app/api/properties/route.ts:20-25`. For more sophisticated matching:
- Add full-text search using PostgreSQL `tsvector`
- Implement geospatial queries using PostGIS extensions on lat/lng columns
- Add fuzzy matching or Levenshtein distance for typos

### Extending to Hong Kong addresses

Currently, Google Maps autocomplete is restricted to `country: 'us'` in `AddressSearch.tsx:71`. To support HK addresses:
- Change `componentRestrictions: { country: 'hk' }`
- Update database with Hong Kong property data from the Python scripts
- Consider bilingual support (English/Traditional Chinese) for building names

## Marketing Website Content Management

### Bilingual Content System

The website supports English and Traditional Chinese (Cantonese) with a toggle button in the navigation.

**Two Methods for Bilingual Content:**

1. **Dynamic Loading (Modern)** - Used for navigation and hero sections:
   - Content stored in `content.json`
   - HTML elements have `data-content-key` attributes
   - JavaScript fetches JSON and updates content on language switch
   - Editing: Update `content.json` → Save → Refresh browser

2. **Data Attributes (Legacy)** - Used for most sections currently:
   - HTML elements have `data-en` and `data-zh` attributes
   - JavaScript reads attributes and updates innerHTML on language switch
   - Editing: Update attributes directly in `pitch.html`

**Migration Strategy:**
As sections are frequently edited, migrate them to `content.json` by:
1. Adding content to `content.json` under appropriate section
2. Replacing `data-en`/`data-zh` with `data-content-key="section.field"`
3. Content automatically loads from JSON

**Language Persistence:**
- User's language choice saved to `localStorage`
- Preference restored on page reload

### File Structure

```
/Users/ronnielee/neighbr/
├── pitch.html                          # Main landing page
├── content.json                        # Bilingual content (navigation + hero)
├── README-FOR-CONTENT-EDITORS.md       # Quick start for non-technical editors
├── CONTENT-EDITING-GUIDE.md            # Detailed editing documentation
├── manifest.json                       # PWA manifest
└── app mockups/
    ├── neighbr-app-mockup.html         # Tenant dashboard mockup
    ├── neighbr-booking.html            # Facility booking mockup
    ├── neighbr-bulletin.html           # Community board mockup
    ├── neighbr-chat.html               # Messaging mockup
    └── neighbr-maintenance.html        # Maintenance reporting mockup
```

## Notes

- The Next.js app uses the App Router (not Pages Router)
- Tailwind CSS 4 is configured via `@tailwindcss/postcss`
- Database connection uses connection pooling (singleton pattern) to avoid exhausting connections
- Python scripts use `verify=False` for SSL when querying HAD APIs (government certificates may be non-standard)
- Marketing website requires a local web server (not file://) for JSON loading to work
- All Hong Kong Cantonese translations provided by specialized translation agent for cultural accuracy
