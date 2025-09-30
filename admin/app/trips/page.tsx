'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trip } from '@/lib/schema';

interface TripListResponse {
  trips: Trip[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchTrips = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter })
      });

      const response = await fetch(`/api/trips?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch trips');
      }

      setTrips(data.trips);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [search, statusFilter]);

  const handleDelete = async (tripId: number, tripName: string) => {
    if (!confirm(`คุณต้องการลบทริป "${tripName}" หรือไม่?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete trip');
      }

      // Refresh the list
      fetchTrips(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete trip');
    }
  };

  const handleStatusToggle = async (tripId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`/api/trips/${tripId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update trip status');
      }

      // Refresh the list
      fetchTrips(pagination.page);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update trip status');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการทริปท่องเที่ยว</h1>
          <p className="text-gray-600">จัดการข้อมูลทริปท่องเที่ยวทั้งหมด</p>
        </div>
        <Link
          href="/admin/trips/new"
          className="btn-primary"
        >
          เพิ่มทริปใหม่
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">ค้นหาทริป</label>
            <input
              type="text"
              placeholder="ค้นหาตามชื่อหรือคำอธิบาย..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
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
              <option value="draft">ร่าง</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => fetchTrips(1)}
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

      {/* Trips Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ทริป
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ราคา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ระยะเวลา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trips.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    ไม่พบทริปท่องเที่ยว
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {trip.mainImage && (
                          <img
                            src={trip.mainImage}
                            alt={trip.name}
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {trip.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {trip.shortDescription}
                          </div>
                          <div className="text-xs text-gray-400">
                            ความจุ: {trip.capacity}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trip.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {trip.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${
                          trip.status === 'active' ? 'badge-success' :
                          trip.status === 'inactive' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {trip.status === 'active' ? 'เปิดใช้งาน' :
                           trip.status === 'inactive' ? 'ปิดใช้งาน' : 'ร่าง'}
                        </span>
                        {trip.featured && (
                          <span className="badge badge-info">แนะนำ</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link
                        href={`/admin/trips/${trip.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        แก้ไข
                      </Link>
                      <button
                        onClick={() => handleStatusToggle(trip.id, trip.status)}
                        className={`${
                          trip.status === 'active' 
                            ? 'text-red-600 hover:text-red-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {trip.status === 'active' ? 'ปิดใช้งาน' : 'เปิดใช้งาน'}
                      </button>
                      <button
                        onClick={() => handleDelete(trip.id, trip.name)}
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
                  onClick={() => fetchTrips(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ก่อนหน้า
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  หน้า {pagination.page} จาก {pagination.totalPages}
                </span>
                <button
                  onClick={() => fetchTrips(pagination.page + 1)}
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
