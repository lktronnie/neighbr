'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Property } from '@/types';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const address = searchParams.get('address');
  const placeId = searchParams.get('placeId');

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!address || !placeId) {
        setError('No address provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/properties?address=${encodeURIComponent(address)}&placeId=${placeId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        setProperties(data.properties || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [address, placeId]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-gray-900 hover:text-gray-700">
            neighbr
          </Link>
          <div className="text-sm text-gray-600">
            {address && <span>Results for: <span className="font-medium">{address}</span></span>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Search
            </Link>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No properties found for this address.</p>
            <p className="text-sm text-gray-500 mb-6">
              This could mean we don't have data for this location yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Try Another Search
            </Link>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Property Ratings
              </h1>
              <p className="text-gray-600">
                Found {properties.length} {properties.length === 1 ? 'property' : 'properties'}
              </p>
            </div>

            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {property.address}
                      </h3>
                      {(property.city || property.state || property.zip_code) && (
                        <p className="text-sm text-gray-600 mb-3">
                          {[property.city, property.state, property.zip_code]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                      {renderStars(property.rating)}
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-3xl font-bold text-gray-900">
                        {property.rating.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-500">out of 5</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
