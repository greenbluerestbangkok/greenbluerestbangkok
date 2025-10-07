import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching stats from Supabase...');
    
    // Fetch data from Supabase with error checking
    const [articlesResult, productsResult, tripsResult, videosResult, entrepreneursResult] = await Promise.all([
      supabase.from('articles').select('id, status').limit(1000),
      supabase.from('products').select('id, status').limit(1000),
      supabase.from('trips').select('id, status').limit(1000),
      supabase.from('videos').select('id, status').limit(1000),
      supabase.from('entrepreneurs').select('id, status').limit(1000)
    ]);

    // Log any errors
    if (articlesResult.error) console.error('Articles error:', articlesResult.error);
    if (productsResult.error) console.error('Products error:', productsResult.error);
    if (tripsResult.error) console.error('Trips error:', tripsResult.error);
    if (videosResult.error) console.error('Videos error:', videosResult.error);
    if (entrepreneursResult.error) console.error('Entrepreneurs error:', entrepreneursResult.error);

    // Get data or use empty arrays
    const articles = articlesResult.data || [];
    const products = productsResult.data || [];
    const trips = tripsResult.data || [];
    const videos = videosResult.data || [];
    const entrepreneurs = entrepreneursResult.data || [];
    
    console.log('Data fetched:', { 
      articles: articles.length, 
      products: products.length, 
      trips: trips.length, 
      videos: videos.length,
      entrepreneurs: entrepreneurs.length
    });

    // Calculate trips stats
    const tripsStats = {
      total: trips.length,
      active: trips.filter(t => t.status === 'published').length,
      draft: trips.filter(t => t.status === 'draft').length
    };

    // Calculate products stats
    const productsStats = {
      total: products.length,
      available: products.filter(p => p.status === 'available').length,
      outOfStock: products.filter(p => p.status === 'out_of_stock').length
    };

    // Calculate articles stats
    const articlesStats = {
      total: articles.length,
      published: articles.filter(a => a.status === 'published').length,
      draft: articles.filter(a => a.status === 'draft').length
    };

    // Calculate videos stats
    const videosStats = {
      total: videos.length
    };

    // Calculate entrepreneurs stats
    const entrepreneursStats = {
      total: entrepreneurs.length,
      active: entrepreneurs.filter(e => e.status === 'active').length
    };

    const response = {
      trips: tripsStats,
      products: productsStats,
      articles: articlesStats,
      videos: videosStats,
      entrepreneurs: entrepreneursStats
    };
    
    console.log('Returning stats:', response);

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Stats API error:', error);
    console.error('Error details:', error.message, error.stack);
    
    // Return error message for debugging
    return NextResponse.json({
      error: 'Failed to fetch stats',
      message: error.message,
      trips: { total: 0, active: 0, draft: 0 },
      products: { total: 0, available: 0, outOfStock: 0 },
      articles: { total: 0, published: 0, draft: 0 },
      videos: { total: 0 },
      entrepreneurs: { total: 0, active: 0 }
    }, { status: 500 });
  }
}
