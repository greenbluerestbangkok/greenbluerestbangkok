'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Operator } from '@/lib/schema';

interface OperatorListResponse {
  operators: Operator[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchOperators = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(typeFilter && { category: typeFilter }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/admin/api/operators?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch operators');
      }

      setOperators(data.operators);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch operators');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, [search, typeFilter, statusFilter]);

  const handleDelete = async (operatorId: number, operatorName: string) => {
    if (!confirm(`คุณต้องการลบผู้ประกอบการ "${operatorName}" หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/admin/api/operators/${operatorId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete operator');
      }

      // Refresh the list
      fetchOperators(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete operator');
    }
  };

  const handleStatusToggle = async (operatorId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`/admin/api/operators/${operatorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update operator status');
      }

      // Refresh the list
      fetchOperators(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update operator status');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการผู้ประกอบการ</h1>
          <p className="text-gray-600">จัดการข้อมูลผู้ประกอบการในชุมชนทั้งหมด</p>
        </div>
        <Link
          href="/admin/operators/new"
          className="btn-primary"
        >
          เพิ่มผู้ประกอบการใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">ค้นหาผู้ประกอบการ</label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อ, คำอธิบาย หรือประเภท..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">ประเภท</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-input"
            >
              <option value="">ทุกประเภท</option>
              <option value="farm">ฟาร์ม</option>
              <option value="craft">งานฝีมือ</option>
              <option value="restaurant">ร้านอาหาร</option>
              <option value="market">ตลาด</option>
              <option value="art">ศิลปะ</option>
              <option value="education">การศึกษา</option>
              <option value="tourism">ท่องเที่ยว</option>
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
              <option value="active">เปิดใช้งาน</option>
              <option value="inactive">ปิดใช้งาน</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchOperators(1)}
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

      {/* Operators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operators.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบผู้ประกอบการ</h3>
            <p className="text-gray-500">ลองปรับเปลี่ยนเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          operators.map((operator) => (
            <div key={operator.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {operator.image && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={operator.image}
                    alt={operator.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {operator.name}
                  </h3>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="badge badge-info">
                      {operator.type}
                    </span>
                    {operator.featured && (
                      <span className="badge badge-warning">แนะนำ</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {operator.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className={`badge ${
                    operator.status === 'active' ? 'badge-success' : 'badge-error'
                  }`}>
                    {operator.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  {operator.phone && <p>📞 {operator.phone}</p>}
                  {operator.email && <p>📧 {operator.email}</p>}
                  {operator.address && <p>📍 {operator.address}</p>}
                </div>

                {operator.activities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">กิจกรรม:</h4>
                    <div className="flex flex-wrap gap-1">
                      {operator.activities.slice(0, 3).map((activity, index) => (
                        <span key={index} className="badge badge-secondary text-xs">
                          {activity}
                        </span>
                      ))}
                      {operator.activities.length > 3 && (
                        <span className="badge badge-secondary text-xs">
                          +{operator.activities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Link
                    href={`/admin/operators/${operator.id}`}
                    className="flex-1 btn-primary text-center text-sm py-2"
                  >
                    แก้ไข
                  </Link>
                  <button
                    onClick={() => handleStatusToggle(operator.id, operator.status)}
                    className={`px-3 py-2 text-sm rounded-md ${
                      operator.status === 'active' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {operator.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                  </button>
                  <button
                    onClick={() => handleDelete(operator.id, operator.name)}
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
                onClick={() => fetchOperators(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
              <span className="px-3 py-2 text-sm text-gray-700">
                หน้า {pagination.page} จาก {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchOperators(pagination.page + 1)}
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
