'use client';

import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { useState, useRef } from 'react';

const libraries: ("places")[] = ["places"];

interface AddressSearchProps {
  onSelect: (address: string, placeId: string) => void;
}

export default function AddressSearch({ onSelect }: AddressSearchProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address && place.place_id) {
        setInputValue(place.formatted_address);
        onSelect(place.formatted_address, place.place_id);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If user presses enter, trigger place selection
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address && place.place_id) {
        onSelect(place.formatted_address, place.place_id);
      }
    }
  };

  if (loadError) {
    return (
      <div className="text-center text-red-600">
        Error loading Google Maps. Please check your API key.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          options={{
            types: ['address'],
            componentRestrictions: { country: 'us' },
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter an address..."
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </Autocomplete>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-2.5 rounded-full hover:bg-blue-700 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}
