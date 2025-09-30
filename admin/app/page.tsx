'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalContent: number;
  publishedContent: number;
  draftContent: number;
  totalMedia: number;
}

interface RecentFile {
  name: string;
  path: string;
  date: string;
  type: 'content' | 'media';
  subtype: string;
}

interface UserSession {
  ok: boolean;
  email: string;
  user: {
    id: string;
    role: string;
  };
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration: number;
}

export default function Dashboard() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalContent: 0,
    publishedContent: 0,
    draftContent: 0,
    totalMedia: 0,
  });
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkSessionAndLoadStats();
  }, []);

  const checkSessionAndLoadStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check session
      const sessionResponse = await fetch('/api/auth/me');
      if (!sessionResponse.ok) {
        throw new Error('Unauthorized');
      }
      const sessionData = await sessionResponse.json();
      setSession({
        ok: true,
        email: sessionData.user.email,
        user: {
          id: sessionData.user.id.toString(),
          role: sessionData.user.role
        }
      });

      // Load stats concurrently
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Load content and media data concurrently
      const [articlesResponse, productsResponse, tripsResponse] = await Promise.all([
        fetch('/api/articles'),
        fetch('/api/products'),
        fetch('/api/trips')
      ]);

      if (!articlesResponse.ok || !productsResponse.ok || !tripsResponse.ok) {
        // Use mock data for development
        setStats({
          totalContent: 5,
          publishedContent: 3,
          draftContent: 2,
          totalMedia: 0,
        });

        setRecentFiles([
          {
            name: 'ตลาดน้ำบางมด: อดีตที่กลับมาใหม่',
            path: '/articles/1',
            date: new Date().toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'article'
          },
          {
            name: 'เที่ยวชุมชนท่องเที่ยวเชิงอนุรักษ์',
            path: '/trips/1',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'trip'
          },
          {
            name: 'ผลิตภัณฑ์ชุมชนท้องถิ่น',
            path: '/products/1',
            date: new Date(Date.now() - 172800000).toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'product'
          }
        ]);
        return;
      }

      const articlesData = await articlesResponse.json();
      const productsData = await productsResponse.json();
      const tripsData = await tripsResponse.json();

      // Calculate stats from Strapi data
      const totalArticles = articlesData.articles?.length || 0;
      const totalProducts = productsData.products?.length || 0;
      const totalTrips = tripsData.trips?.length || 0;
      const totalContent = totalArticles + totalProducts + totalTrips;

      // Count published vs draft
      let publishedCount = 0;
      let draftCount = 0;

      if (articlesData.articles) {
        articlesData.articles.forEach((article: any) => {
          if (article.status === 'published') publishedCount++;
          else draftCount++;
        });
      }

      if (productsData.products) {
        productsData.products.forEach((product: any) => {
          if (product.status === 'published') publishedCount++;
          else draftCount++;
        });
      }

      if (tripsData.trips) {
        tripsData.trips.forEach((trip: any) => {
          if (trip.status === 'published') publishedCount++;
          else draftCount++;
        });
      }

      setStats({
        totalContent,
        publishedContent: publishedCount,
        draftContent: draftCount,
        totalMedia: 0, // Media count from Strapi would need separate API
      });

      // Create recent files list from Strapi data
      const recentFiles: RecentFile[] = [];

      // Add recent articles
      if (articlesData.articles) {
        articlesData.articles.slice(0, 2).forEach((article: any) => {
          recentFiles.push({
            name: article.title,
            path: `/articles/${article.id}`,
            date: new Date(article.updatedAt).toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'article'
          });
        });
      }

      // Add recent trips
      if (tripsData.trips) {
        tripsData.trips.slice(0, 1).forEach((trip: any) => {
          recentFiles.push({
            name: trip.name,
            path: `/trips/${trip.id}`,
            date: new Date(trip.updatedAt).toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'trip'
          });
        });
      }

      // Add recent products
      if (productsData.products) {
        productsData.products.slice(0, 1).forEach((product: any) => {
          recentFiles.push({
            name: product.name,
            path: `/products/${product.id}`,
            date: new Date(product.updatedAt).toISOString().split('T')[0] || '',
            type: 'content',
            subtype: 'product'
          });
        });
      }

      setRecentFiles(recentFiles);

    } catch (err) {
      console.error('Error loading stats:', err);
        // Use fallback mock data
        setStats({
          totalContent: 5,
          publishedContent: 3,
          draftContent: 2,
          totalMedia: 0,
        });
    }
  };

  const addToast = (type: Toast['type'], message: string, duration = 3000) => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, type, message, duration };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      addToast('success', 'ออกจากระบบเรียบร้อย');
      router.push('/admin/login');
    } catch (err) {
      addToast('error', 'เกิดข้อผิดพลาดในการออกจากระบบ');
      router.push('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">กำลังโหลด Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🔒 เข้าถึงไม่ได้</h1>
          <p className="text-gray-600 mb-6">{error || 'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ'}</p>
          <Link
            href="/admin/login"
            className="btn-primary text-lg px-6 py-3"
          >
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏛️ Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          จัดการเนื้อหาและสื่อสำหรับ <span className="text-green-600 font-semibold">GreenBlueRest Bangkok</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ยินดีต้อนรับ, {session.email}
        </p>
        <div className="mt-4 flex justify-center">
          <a 
            href="https://greenbluerestbangkok.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary text-lg px-6 py-3"
          >
            🌐 ดูเว็บไซต์หลัก
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="admin-card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {stats.totalContent}
          </h3>
          <p className="text-gray-600">เนื้อหาทั้งหมด</p>
        </div>

        <div className="admin-card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {stats.publishedContent}
          </h3>
          <p className="text-gray-600">เผยแพร่แล้ว</p>
        </div>

        <div className="admin-card text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {stats.draftContent}
          </h3>
          <p className="text-gray-600">ร่าง</p>
        </div>

        <div className="admin-card text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🖼️</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {stats.totalMedia}
          </h3>
          <p className="text-gray-600">ไฟล์สื่อ</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          การดำเนินการด่วน
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="/admin/trips/new"
            className="group flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">🧭</span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                เพิ่มทริปใหม่
              </h3>
              <p className="text-gray-600">
                สร้างทริปท่องเที่ยวใหม่
              </p>
            </div>
          </a>

          <a
            href="/admin/products/new"
            className="group flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🛍️</span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                เพิ่มสินค้าใหม่
              </h3>
              <p className="text-gray-600">
                เพิ่มสินค้าชุมชนใหม่
              </p>
            </div>
          </a>

          <a
            href="/admin/articles/new"
            className="group flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                เขียนบทความใหม่
              </h3>
              <p className="text-gray-600">
                เพิ่มบทความหรือข้อมูลใหม่
              </p>
            </div>
          </a>

          <a
            href="/admin/media"
            className="group flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🖼️</span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                จัดการสื่อ
              </h3>
              <p className="text-gray-600">
                อัปโหลดและจัดการไฟล์ภาพ
              </p>
            </div>
          </a>

          <a
            href="/admin/articles"
            className="group flex items-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">📋</span>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ดูบทความทั้งหมด
              </h3>
              <p className="text-gray-600">
                จัดการและแก้ไขบทความที่มีอยู่
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Files */}
      <div className="admin-card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">🕒</span>
          ไฟล์ล่าสุด
        </h2>
        <div className="space-y-4">
          {recentFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    file.type === 'content' 
                      ? 'bg-blue-100' 
                      : 'bg-green-100'
                  }`}>
                    <span className={`text-lg ${
                      file.type === 'content' 
                        ? 'text-blue-600' 
                        : 'text-green-600'
                    }`}>
                      {file.type === 'content' ? '📝' : '🖼️'}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {file.name}
                  </h3>
                  <p className="text-gray-500">
                    {file.type === 'content' ? 'เนื้อหา' : 'สื่อ'} • {file.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`badge ${
                  file.subtype === 'md' 
                    ? 'badge-info' 
                    : file.subtype === 'json'
                    ? 'badge-warning'
                    : 'badge-success'
                }`}>
                  {file.subtype}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${
                toast.type === 'success' ? 'toast-success' :
                toast.type === 'error' ? 'toast-error' :
                toast.type === 'warning' ? 'toast-warning' :
                'toast-info'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-lg">
                    {toast.type === 'success' ? '✅' :
                     toast.type === 'error' ? '❌' :
                     toast.type === 'warning' ? '⚠️' : 'ℹ️'}
                  </span>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {toast.message}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">ปิด</span>
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
