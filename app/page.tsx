'use client';

import { useRouter } from 'next/navigation';
import AddressSearch from '@/components/AddressSearch';

export default function Home() {
  const router = useRouter();

  const handleAddressSelect = (address: string, placeId: string) => {
    // Navigate to results page with the selected address
    router.push(`/results?address=${encodeURIComponent(address)}&placeId=${placeId}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">neighbr</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Find Your Perfect Neighborhood
            </h2>
            <p className="text-lg text-gray-600">
              Search any address to see ratings and insights
            </p>
          </div>

          {/* Search Box */}
          <AddressSearch onSelect={handleAddressSelect} />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-sm text-gray-500">
        <p>&copy; 2024 neighbr. All rights reserved.</p>
      </footer>
    </div>
  );
}
