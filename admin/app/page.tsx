'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Stats {
  trips: {
    total: number;
    active: number;
    draft: number;
  };
  products: {
    total: number;
    available: number;
    outOfStock: number;
  };
  articles: {
    total: number;
    published: number;
    draft: number;
  };
  videos: {
    total: number;
  };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    trips: { total: 0, active: 0, draft: 0 },
    products: { total: 0, available: 0, outOfStock: 0 },
    articles: { total: 0, published: 0, draft: 0 },
    videos: { total: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        // ถ้า API ไม่ทำงาน ใช้ค่า default
        console.log('Stats API failed, using default values');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      // ใช้ค่า default ถ้า error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🏠 แดชบอร์ด
        </h1>
        <p className="text-gray-600">
          ภาพรวมระบบจัดการเนื้อหา Green Blue Rest Bangkok
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Trips Card */}
        <Link href="/trips" className="block">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🎒</div>
              <div className="bg-white bg-opacity-30 rounded-full p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stats.trips.total}</div>
            <div className="text-sm opacity-90">ทริปท่องเที่ยวทั้งหมด</div>
            <div className="mt-3 pt-3 border-t border-white border-opacity-30 flex justify-between text-xs">
              <span>เปิดใช้งาน: {stats.trips.active}</span>
              <span>ร่าง: {stats.trips.draft}</span>
            </div>
          </div>
        </Link>

        {/* Products Card */}
        <Link href="/products" className="block">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🛍️</div>
              <div className="bg-white bg-opacity-30 rounded-full p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stats.products.total}</div>
            <div className="text-sm opacity-90">สินค้าชุมชนทั้งหมด</div>
            <div className="mt-3 pt-3 border-t border-white border-opacity-30 flex justify-between text-xs">
              <span>มีสินค้า: {stats.products.available}</span>
              <span>หมดสต็อก: {stats.products.outOfStock}</span>
            </div>
          </div>
        </Link>

        {/* Articles Card */}
        <Link href="/articles" className="block">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📝</div>
              <div className="bg-white bg-opacity-30 rounded-full p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stats.articles.total}</div>
            <div className="text-sm opacity-90">บทความทั้งหมด</div>
            <div className="mt-3 pt-3 border-t border-white border-opacity-30 flex justify-between text-xs">
              <span>เผยแพร่: {stats.articles.published}</span>
              <span>ร่าง: {stats.articles.draft}</span>
            </div>
          </div>
        </Link>

        {/* Videos Card */}
        <Link href="/videos" className="block">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">🎥</div>
              <div className="bg-white bg-opacity-30 rounded-full p-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stats.videos.total}</div>
            <div className="text-sm opacity-90">วิดีโอทั้งหมด</div>
            <div className="mt-3 pt-3 border-t border-white border-opacity-30 text-xs">
              เผยแพร่แล้ว
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ การดำเนินการด่วน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/trips/new"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <div className="text-2xl mr-3">➕</div>
            <div>
              <div className="font-medium text-gray-900">เพิ่มทริปใหม่</div>
              <div className="text-sm text-gray-500">สร้างทริปท่องเที่ยว</div>
            </div>
          </Link>

          <Link
            href="/products/new"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="text-2xl mr-3">🆕</div>
            <div>
              <div className="font-medium text-gray-900">เพิ่มสินค้าใหม่</div>
              <div className="text-sm text-gray-500">เพิ่มสินค้าชุมชน</div>
            </div>
          </Link>

          <Link
            href="/articles/new"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <div className="text-2xl mr-3">✍️</div>
            <div>
              <div className="font-medium text-gray-900">เขียนบทความใหม่</div>
              <div className="text-sm text-gray-500">สร้างบทความ</div>
            </div>
          </Link>

          <Link
            href="/media"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors"
          >
            <div className="text-2xl mr-3">📸</div>
            <div>
              <div className="font-medium text-gray-900">อัปโหลดรูปภาพ</div>
              <div className="text-sm text-gray-500">จัดการไฟล์มีเดีย</div>
            </div>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            ภาพรวมระบบ
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Database</span>
              <span className="text-green-600 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Supabase (Connected)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Storage</span>
              <span className="text-green-600 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Supabase Storage
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Deployment</span>
              <span className="text-green-600 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Vercel
              </span>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📚</span>
            แหล่งข้อมูล
          </h2>
          <div className="space-y-3">
            <a
              href="/docs/user-guide"
              target="_blank"
              className="block p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <div className="font-medium text-indigo-900">📖 คู่มือการใช้งาน</div>
              <div className="text-sm text-indigo-600">เรียนรู้วิธีใช้งานระบบ CMS</div>
            </a>
            <a
              href="/docs/api"
              target="_blank"
              className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="font-medium text-green-900">🔌 API Documentation</div>
              <div className="text-sm text-green-600">เอกสารสำหรับ developers</div>
            </a>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="font-medium text-purple-900">🗄️ Supabase Dashboard</div>
              <div className="text-sm text-purple-600">จัดการฐานข้อมูล</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
