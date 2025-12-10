-- Create the properties table
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on address for faster searches
CREATE INDEX IF NOT EXISTS idx_properties_address ON properties(address);

-- Create an index on coordinates for geospatial queries
CREATE INDEX IF NOT EXISTS idx_properties_coords ON properties(latitude, longitude);

-- Sample data (you can add more or replace this with your scraped data)
INSERT INTO properties (address, latitude, longitude, rating, city, state, zip_code) VALUES
  ('123 Main St', 40.7128, -74.0060, 4.5, 'New York', 'NY', '10001'),
  ('456 Oak Ave', 40.7589, -73.9851, 3.8, 'New York', 'NY', '10019'),
  ('789 Pine Rd', 34.0522, -118.2437, 4.2, 'Los Angeles', 'CA', '90001'),
  ('321 Elm St', 41.8781, -87.6298, 4.7, 'Chicago', 'IL', '60601'),
  ('654 Maple Dr', 29.7604, -95.3698, 3.5, 'Houston', 'TX', '77001')
ON CONFLICT DO NOTHING;
