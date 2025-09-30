'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  description?: string;
  content?: string;
  author?: string;
  category?: string;
  status: 'draft' | 'published';
  image_url?: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
}

interface ArticleListResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/articles?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch articles');
      }

      setArticles(data.articles);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search, categoryFilter, statusFilter]);

  const handleDelete = async (articleId: number, articleTitle: string) => {
    if (!confirm(`คุณต้องการลบบทความ "${articleTitle}" หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete article');
      }

      // Refresh the list
      fetchArticles(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  const handleStatusToggle = async (articleId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update article status');
      }

      // Refresh the list
      fetchArticles(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update article status');
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'travel':
        return 'ท่องเที่ยว';
      case 'community':
        return 'ชุมชน';
      case 'culture':
        return 'วัฒนธรรม';
      case 'food':
        return 'อาหาร';
      case 'history':
        return 'ประวัติศาสตร์';
      default:
        return category;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'badge-success';
      case 'draft':
        return 'badge-warning';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'เผยแพร่';
      case 'draft':
        return 'ร่าง';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการบทความ</h1>
          <p className="text-gray-600">จัดการข้อมูลบทความทั้งหมด</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="btn-primary"
        >
          เขียนบทความใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">ค้นหาบทความ</label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อหรือคำอธิบาย..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">หมวดหมู่</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-input"
            >
              <option value="">ทุกหมวดหมู่</option>
              <option value="travel">ท่องเที่ยว</option>
              <option value="community">ชุมชน</option>
              <option value="culture">วัฒนธรรม</option>
              <option value="food">อาหาร</option>
              <option value="history">ประวัติศาสตร์</option>
            </select>
          </div>
          <div>
            <label className="form-label">สถานะ</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input"
            >
              <option value="">ทุกสถานะ</option>
              <option value="published">เผยแพร่</option>
              <option value="draft">ร่าง</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchArticles(1)}
              className="btn-secondary w-full"
            >
              ค้นหา
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-error mb-6">
          {error}
        </div>
      )}

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบบทความ</h3>
            <p className="text-gray-500">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {article.image_url && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex flex-col items-end space-y-1">
                    {article.category && (
                      <span className="badge badge-info">
                        {getCategoryText(article.category)}
                      </span>
                    )}
                    <span className={`badge ${getStatusBadge(article.status)}`}>
                      {getStatusText(article.status)}
                    </span>
                  </div>
                </div>

                {article.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                )}

                <div className="text-sm text-gray-500 mb-4">
                  {article.author && <p>ผู้เขียน: {article.author}</p>}
                  <p>อัปเดต: {new Date(article.updatedAt).toLocaleDateString('th-TH')}</p>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="flex-1 btn-primary text-center text-sm py-2"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleStatusToggle(article.id, article.status)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      article.status === 'published' 
                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {article.status === 'published' ? 'เป็นร่าง' : 'เผยแพร่'}
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    className="px-3 py-2 text-sm text-red-600 hover:text-red-800"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              แสดง {((pagination.page - 1) * pagination.limit) + 1} ถึง{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} จาก{' '}
              {pagination.total} รายการ
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => fetchArticles(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                หน้า {pagination.page} จาก {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchArticles(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
