import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Property } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    const placeId = searchParams.get('placeId');

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Search for properties matching or similar to the address
    // This is a simple ILIKE search - you can make it more sophisticated
    const result = await query(
      `SELECT * FROM properties
       WHERE address ILIKE $1
       ORDER BY rating DESC
       LIMIT 20`,
      [`%${address}%`]
    );

    const properties: Property[] = result.rows.map((row) => ({
      id: row.id,
      address: row.address,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
      rating: parseFloat(row.rating),
      city: row.city,
      state: row.state,
      zip_code: row.zip_code,
      created_at: row.created_at,
    }));

    return NextResponse.json({
      properties,
      total: properties.length,
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST endpoint to add new properties (for future use with scraping)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, latitude, longitude, rating, city, state, zip_code } = body;

    if (!address || !rating) {
      return NextResponse.json(
        { error: 'Address and rating are required' },
        { status: 400 }
      );
    }

    if (rating < 0 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 0 and 5' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO properties (address, latitude, longitude, rating, city, state, zip_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [address, latitude, longitude, rating, city, state, zip_code]
    );

    const property: Property = {
      id: result.rows[0].id,
      address: result.rows[0].address,
      latitude: parseFloat(result.rows[0].latitude),
      longitude: parseFloat(result.rows[0].longitude),
      rating: parseFloat(result.rows[0].rating),
      city: result.rows[0].city,
      state: result.rows[0].state,
      zip_code: result.rows[0].zip_code,
      created_at: result.rows[0].created_at,
    };

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
