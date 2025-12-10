# neighbr

A modern web application for searching property addresses and viewing ratings. Built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- Clean, minimal UI inspired by Airbnb and Google
- Google Maps autocomplete address search
- Property ratings (1-5 stars) from PostgreSQL database
- Results sorted by relevance and rating
- Responsive design

## Tech Stack

- **Frontend:** Next.js 14 with TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **Maps:** Google Maps API
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- Google Maps API key with Places API enabled

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/lktronnie/neighbr.git
   cd neighbr
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

   Then edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
   DATABASE_URL=postgresql://username:password@localhost:5432/neighbr
   ```

4. **Set up the database:**

   Create a PostgreSQL database named `neighbr`:
   ```bash
   createdb neighbr
   ```

   Run the schema file to create tables and seed data:
   ```bash
   psql -d neighbr -f schema.sql
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
4. Go to Credentials and create an API key
5. Add the API key to your `.env.local` file

## Database Schema

The `properties` table structure:

```sql
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(2, 1) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Adding Property Data

Currently, the app includes sample data in `schema.sql`. To add scraped data later:

### Option 1: Direct SQL Insert
```sql
INSERT INTO properties (address, latitude, longitude, rating, city, state, zip_code)
VALUES ('123 Example St', 40.7128, -74.0060, 4.5, 'New York', 'NY', '10001');
```

### Option 2: API Endpoint
Use the POST endpoint at `/api/properties`:

```javascript
fetch('/api/properties', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    address: '123 Example St',
    latitude: 40.7128,
    longitude: -74.0060,
    rating: 4.5,
    city: 'New York',
    state: 'NY',
    zip_code: '10001'
  })
})
```

## Project Structure

```
neighbr/
├── app/
│   ├── api/
│   │   └── properties/
│   │       └── route.ts          # API routes for property CRUD
│   ├── results/
│   │   └── page.tsx              # Results page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage with search
├── components/
│   ├── AddressSearch.tsx         # Google Maps autocomplete search
│   └── PropertyCard.tsx          # Property listing card
├── lib/
│   └── db.ts                     # Database connection utilities
├── types/
│   └── index.ts                  # TypeScript type definitions
├── schema.sql                    # Database schema and sample data
├── .env.local.example            # Environment variables template
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Set up data scraping scripts to populate the database
2. Implement more sophisticated search (fuzzy matching, geospatial queries)
3. Add property details page
4. Add user authentication
5. Implement rating submission by users
6. Add filters and sorting options
7. Deploy to production (Vercel + hosted PostgreSQL)

## License

MIT
