'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Content } from '@/lib/schema';

interface ContentListResponse {
  contents: Content[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function EnhancedContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchContents = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { type: typeFilter })
      });

      const response = await fetch(`/admin/api/enhanced-content?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch content');
      }

      setContents(data.contents);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents();
  }, [search, categoryFilter, statusFilter, typeFilter]);

  const handleDelete = async (contentId: number, contentTitle: string) => {
    if (!confirm(`คุณต้องการลบเนื้อหา "${contentTitle}" หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/admin/api/enhanced-content/${contentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete content');
      }

      // Refresh the list
      fetchContents(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete content');
    }
  };

  const handleStatusToggle = async (contentId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const response = await fetch(`/admin/api/enhanced-content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update content status');
      }

      // Refresh the list
      fetchContents(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update content status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'badge-success';
      case 'draft':
        return 'badge-warning';
      case 'archived':
        return 'badge-error';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'เผยแพร่แล้ว';
      case 'draft':
        return 'ร่าง';
      case 'archived':
        return 'เก็บถาวร';
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'blog':
        return 'บทความ';
      case 'vlog':
        return 'วิดีโอ';
      case 'news':
        return 'ข่าวสาร';
      case 'guide':
        return 'คู่มือ';
      default:
        return category;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'article':
        return 'บทความ';
      case 'video':
        return 'วิดีโอ';
      case 'gallery':
        return 'แกลเลอรี่';
      default:
        return type;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการเนื้อหาขั้นสูง</h1>
          <p className="text-gray-600">จัดการบทความ วิดีโอ และเนื้อหาอื่นๆ</p>
        </div>
        <Link
          href="/admin/enhanced-content/new"
          className="btn-primary"
        >
          เพิ่มเนื้อหาใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="form-label">ค้นหาเนื้อหา</label>
            <input
              type="text"
              placeholder="ค้นหาตามหัวข้อหรือเนื้อหา..."
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
              <option value="blog">บทความ</option>
              <option value="vlog">วิดีโอ</option>
              <option value="news">ข่าวสาร</option>
              <option value="guide">คู่มือ</option>
            </select>
          </div>
          <div>
            <label className="form-label">ประเภท</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-input"
            >
              <option value="">ทุกประเภท</option>
              <option value="article">บทความ</option>
              <option value="video">วิดีโอ</option>
              <option value="gallery">แกลเลอรี่</option>
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
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">ร่าง</option>
              <option value="archived">เก็บถาวร</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchContents(1)}
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

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เนื้อหา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หมวดหมู่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    ไม่พบเนื้อหา
                  </td>
                </tr>
              ) : (
                contents.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {content.image && (
                          <img
                            src={content.image}
                            alt={content.title}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {content.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {content.excerpt || content.content.substring(0, 100) + '...'}
                          </div>
                          {content.author && (
                            <div className="text-xs text-gray-400">
                              โดย: {content.author}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-info">
                        {getCategoryText(content.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-secondary">
                        {getTypeText(content.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${getStatusBadge(content.status)}`}>
                          {getStatusText(content.status)}
                        </span>
                        {content.featured && (
                          <span className="badge badge-warning">แนะนำ</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.publishedAt ? 
                        new Date(content.publishedAt).toLocaleDateString('th-TH') :
                        content.createdAt ? 
                        new Date(content.createdAt).toLocaleDateString('th-TH') : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/enhanced-content/${content.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleStatusToggle(content.id, content.status)}
                        className={`${
                          content.status === 'published' 
                            ? 'text-orange-600 hover:text-orange-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {content.status === 'published' ? 'เป็นร่าง' : 'เผยแพร่'}
                      </button>
                      <button
                        onClick={() => handleDelete(content.id, content.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                แสดง {((pagination.page - 1) * pagination.limit) + 1} ถึง{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} จาก{' '}
                {pagination.total} รายการ
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchContents(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ก่อนหน้า
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  หน้า {pagination.page} จาก {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchContents(pagination.page + 1)}
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
    </div>
  );
}
