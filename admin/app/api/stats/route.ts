import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/stats - Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    // Fetch data from Supabase
    const [articlesResult, productsResult, tripsResult, videosResult] = await Promise.all([
      supabase.from('articles').select('id, status').limit(1000),
      supabase.from('products').select('id, status').limit(1000),
      supabase.from('trips').select('id, status').limit(1000),
      supabase.from('videos').select('id, status').limit(1000)
    ]);

    // Get data or use empty arrays
    const articles = articlesResult.data || [];
    const products = productsResult.data || [];
    const trips = tripsResult.data || [];
    const videos = videosResult.data || [];

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

    return NextResponse.json({
      trips: tripsStats,
      products: productsStats,
      articles: articlesStats,
      videos: videosStats
    });

  } catch (error) {
    console.error('Stats API error:', error);
    
    // Return default stats if error
    return NextResponse.json({
      trips: { total: 0, active: 0, draft: 0 },
      products: { total: 0, available: 0, outOfStock: 0 },
      articles: { total: 0, published: 0, draft: 0 },
      videos: { total: 0 }
    });
  }
}
