export interface Property {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at?: Date;
}

export interface SearchResult {
  properties: Property[];
  total: number;
}
