'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/schema';

interface ProductListResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
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

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch products');
      }

      setProducts(data.products);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, categoryFilter, statusFilter]);

  const handleDelete = async (productId: number, productName: string) => {
    if (!confirm(`คุณต้องการลบสินค้า "${productName}" หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete product');
      }

      // Refresh the list
      fetchProducts(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleStatusToggle = async (productId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'out_of_stock' : 'available';
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product status');
      }

      // Refresh the list
      fetchProducts(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update product status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'badge-success';
      case 'out_of_stock':
        return 'badge-error';
      case 'discontinued':
        return 'badge-warning';
      default:
        return 'badge-warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'มีสินค้า';
      case 'out_of_stock':
        return 'หมดสต็อก';
      case 'discontinued':
        return 'ยกเลิกแล้ว';
      default:
        return status;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'beauty':
        return 'ความงาม';
      case 'food':
        return 'อาหาร';
      case 'craft':
        return 'งานฝีมือ';
      default:
        return category;
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการสินค้าชุมชน</h1>
          <p className="text-gray-600">จัดการข้อมูลสินค้าชุมชนทั้งหมด</p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-primary"
        >
          เพิ่มสินค้าใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">ค้นหาสินค้า</label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อ, คำอธิบาย หรือผู้ผลิต..."
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
              <option value="beauty">ความงาม</option>
              <option value="food">อาหาร</option>
              <option value="craft">งานฝีมือ</option>
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
              <option value="available">มีสินค้า</option>
              <option value="out_of_stock">หมดสต็อก</option>
              <option value="discontinued">ยกเลิกแล้ว</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchProducts(1)}
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛍️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสินค้า</h3>
            <p className="text-gray-500">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {product.image && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="badge badge-info">
                      {getCategoryText(product.category)}
                    </span>
                    {product.featured && (
                      <span className="badge badge-warning">แนะนำ</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-green-600">
                    {product.price}
                  </span>
                  <span className={`badge ${getStatusBadge(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <p>ผู้ผลิต: {product.producer}</p>
                  {product.stock !== undefined && (
                    <p>สต็อก: {product.stock}</p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="flex-1 btn-primary text-center text-sm py-2"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleStatusToggle(product.id, product.status)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      product.status === 'available' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {product.status === 'available' ? 'หมดสต็อก' : 'มีสินค้า'}
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
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
                onClick={() => fetchProducts(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                หน้า {pagination.page} จาก {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchProducts(pagination.page + 1)}
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
